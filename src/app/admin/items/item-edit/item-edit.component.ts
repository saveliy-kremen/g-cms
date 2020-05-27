import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'src/app/shared/models/message.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { AdminItemGrpcService } from 'src/app/shared/services/grpc/admin-item.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { VendorGrpcService } from 'src/app/shared/services/grpc/vendor.service';
import { CurrencyGrpcService } from 'src/app/shared/services/grpc/currency.service';

declare var $: any

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  private formSubmitted: boolean

  changeFormState(value: boolean) {
    this.formSubmitted = value
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }
}

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  matcher = new MyErrorStateMatcher()
  uploadUrl: string
  mode: string
  itemTabIndex: number;

  //Item
  itemForm: FormGroup
  itemFormSubmitted: boolean
  itemMessage: Message = new Message("success", "")
  itemID: number
  item: any = {}
  categoriesData: any
  itemProperties: any = []

  //Parent
  parent: any
  parentID: number

  //Images
  itemImages: any = []
  uploadImages: any = []
  requestItemImages: any
  requestUploadImages: any

  //Offers
  displayedColumns: string[] = ['position', 'title', 'image', 'article', 'price', 'sort', 'actions']
  columnDefs = [
    { column: "title", title: "Title", translate: true, sort: true },
    { column: "image", title: "Image", translate: true, sort: false },
    { column: "article", title: "Article", translate: true, sort: true },
    { column: "price", title: "Price", translate: true, sort: true },
    { column: "sort", title: "Sort", translate: true, sort: true },
  ]
  actions = []
  offersData: any
  offersPage: number = 0
  offersPageSize: number
  offersSort: string
  offersDirection: string
  offerID: number
  total: number

  //Vendors
  vendors: any = []

  //Currencies
  currencies: any = []

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private adminItemService: AdminItemGrpcService,
    private vendorService: VendorGrpcService,
    private currencyService: CurrencyGrpcService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private uploadService: UploadService,
    private modalService: ModalService,
    private translateService: TranslateService,
  ) { }

  async ngOnInit() {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      article: new FormControl(''),
      alias: new FormControl(''),
      description: new FormControl('', Validators.required),
      vendorId: new FormControl(''),
      price: new FormControl(''),
      oldPrice: new FormControl(''),
      currencyId: new FormControl(''),
      count: new FormControl(''),
      inStock: new FormControl(''),
      disable: new FormControl(''),
      sort: new FormControl('', Validators.required),
      properties: new FormArray([])
    })
    this.loaderService.showLoader()
    if (this.activeRoute.snapshot.queryParamMap.get("tab")) {
      this.itemTabIndex = Number(this.activeRoute.snapshot.queryParamMap.get("tab"))
    }
    if (this.activeRoute.snapshot.params["offerMode"]) {
      this.mode = this.activeRoute.snapshot.params["offerMode"]
      this.parentID = Number(this.activeRoute.snapshot.params["id"])
      this.itemID = Number(this.activeRoute.snapshot.params["offerID"])
    } else {
      this.mode = this.activeRoute.snapshot.params["mode"]
      this.itemID = Number(this.activeRoute.snapshot.params["id"])
    }
    try {
      if (this.mode == "edit") {
        let res: any = await this.authService.getUser()
        this.uploadUrl = `${environment.siteUrl}/uploads/users/${res.id}/items/`
        res = await this.adminItemService.item(Number(this.itemID)).toPromise()
        this.item = res.item
        this.updateOffersData(res.item)
      } else {
        const res: any = await this.adminItemService.createDraftItem(this.parentID).toPromise()
        this.item = res.item
        this.mode = "draft"
      }
      this.changeInStock(this.item.inStock)
      this.item.vendorId = this.item.vendor.id
      this.item.currencyId = this.item.currency.id
      this.itemForm.patchValue(this.item)
      if (this.parentID) {
        this.itemForm.controls['alias'].disable()
      }
      this.itemImages = this.item.imagesList
      let res: any = await this.adminItemService.getUploadImages().toPromise()
      this.uploadImages = res.imagesList
      res = await this.adminItemService.itemCategories(this.item.id).toPromise()
      this.categoriesData = res.categoriesList
      await this.categoriesTranslate();
      await this.updateProperties();
    } catch (err) {
      this.itemMessage = new Message("danger", err.message);
    }
    try {
      let res: any = await this.vendorService.vendors(0, 0, "name", "ASC").toPromise()
      this.vendors = res.vendorsList
      res = await this.currencyService.currencies(0, 0, "name", "ASC").toPromise()
      this.currencies = res.currenciesList
    } catch (err) {
      this.itemMessage = new Message("danger", err.message);
    }
    this.loaderService.hideLoader()
  }

  get properties(): FormArray {
    return this.itemForm.get('properties') as FormArray;
  }

  async categoriesTranslate() {
    for (let i = 0; i < this.categoriesData.length; i++) {
      if (this.categoriesData[i].parent === "#") {
        this.categoriesData[i].text = await this.translateService.get(this.categoriesData[i].text).toPromise();
      }
    }
  }

  async updateProperties() {
    try {
      const res: any = await this.adminItemService.itemProperties(this.item.id).toPromise()
      let formArray = <FormArray>this.itemForm.get("properties")
      while (formArray.length !== 0) {
        formArray.removeAt(0)
      }
      this.itemProperties = res.propertiesList
      for (let property of res.propertiesList) {
        let formItem = {};
        if (property.multiple) {
          formItem[property.code] = new FormControl(property.itemValuesList, property.required ? Validators.required : null);
        } else {
          formItem[property.code] = new FormControl(property.itemValuesList[0], property.required ? Validators.required : null);
        }
        formArray.push(new FormGroup(formItem))
      }
    } catch (err) {
      console.log(err)
    }
  }

  changeInStock(value) {
    if (value) {
      this.itemForm.get('count')['disable']();
    } else {
      this.itemForm.get('count')['enable']();
    }
  }

  onTabChange(event) {
    if (event.index == 3) {
      $('#categoryTree').jstree({
        'core': {
          'data': this.categoriesData,
          "cache": false,
          "dataType": "json",
        },
        checkbox: { cascade: "undetermined", three_state: false },
        check_callback: true,
        plugins: ["checkbox"],
      })
        .bind("select_node.jstree", this.bindProperty.bind(this))
        .bind("deselect_node.jstree", this.unbindProperty.bind(this))
    } else {
      $("#categoryTree").jstree("destroy");
    }
  }

  async bindProperty(evt, data) {
    this.loaderService.showLoader()
    try {
      await this.adminItemService.itemBindCategory(
        this.item.id,
        data.node.id
      );
    } catch (err) {
      console.log(err)
    }
    this.loaderService.hideLoader()
  }

  async unbindProperty(evt, data) {
    this.loaderService.showLoader()
    try {
      await this.adminItemService.itemUnbindCategory(
        this.item.id,
        data.node.id
      );
    } catch (err) {
      console.log(err)
    }
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    this.offersPage = event.pageIndex
    this.offersPageSize = event.pageSize
    this.offersSort = event.sort
    this.offersDirection = event.direction
    let res = await this.adminItemService.itemOffers(this.itemID, this.offersPage, this.offersPageSize, this.offersSort, this.offersDirection).toPromise()
    this.updateOffersData(res)
  }

  editOfferAction(id) {
    this.router.navigate(["/admin/items/edit/" + this.itemID + "/offers/edit/", id])
  }

  updateOffersData(data) {
    this.offersData = data.offersList.map((item, index) => {
      return {
        ...item,
        image: item.imagesList && item.imagesList.length > 0 ? `<img src="${this.uploadUrl + item.id}/${item.imagesList[0].filename}" alt="${item.title}" width="100" height="120">` : `<img src="" alt="${item.title}" width="100" height="120">`,
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editOfferAction.bind(this), id: item.id },
          { icon: "delete", class: "button-delete", handler: this.deleteOfferConfirm.bind(this), id: item.id }
        ],
      }
    })
    this.total = data.total
  }

  async deleteOfferConfirm(id) {
    this.offerID = id;
    const property = this.offersData.filter(item => item.id == id)[0];
    const modalData = {
      title: await this.translateService.get("Delete Trading Offer").toPromise(),
      text: await this.translateService.get("Delete trading offer").toPromise() + ` "${property.title}"?`,
      callBackFunction: this.deleteOffer.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteOffer(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.adminItemService.deleteOffer(this.offerID, this.itemID, this.offersPage, this.offersPageSize, this.offersSort, this.offersDirection).toPromise()
        this.updateOffersData(res)
      }
    } catch (err) {
      this.itemMessage = new Message("danger", err.message);
    }
    this.loaderService.hideLoader()
  }

  itemImageDelete(id) {
    this.itemImages = this.itemImages.filter(item => item.id != id)
  }

  uploadImageDelete($event, id) {
    $event.stopPropagation();
    this.uploadImages = this.uploadImages.filter(item => item.id != id)
  }

  async submitItemForm() {
    this.loaderService.showLoader()
    this.itemFormSubmitted = true;
    this.matcher.changeFormState(true)
    if (this.itemForm.valid) {
      try {
        this.itemForm.value.id = (this.mode == "edit" || this.mode == "draft") ? Number(this.item.id) : null
        this.itemForm.value.itemImages = this.itemImages.map(item => item.id)
        this.itemForm.value.uploadImages = this.uploadImages.map(item => item.id)
        this.itemForm.value.parentID = this.parentID
        await this.adminItemService.editItem(this.itemForm.value)
        this.itemFormSubmitted = false;
        this.matcher.changeFormState(false)
        this.itemMessage = new Message("success", "");
        this.itemForm.reset();
        if (this.activeRoute.snapshot.params["offerMode"]) {
          this.router.navigate(["/admin/items/edit", this.parentID], { queryParams: { tab: 4 } })
        } else {
          this.router.navigateByUrl("/admin/items");
        }
      } catch (err) {
        this.itemMessage = new Message("danger", err.message);
      }
    }
    this.loaderService.hideLoader()
  }

  async onSelect($event) {
    if ($event.addedFiles.length > 0) {
      this.loaderService.showLoader()
      for (let i = 0; i < $event.addedFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', $event.addedFiles[i]);
        const res: any = await this.uploadService.upload(formData).toPromise()
        if (typeof (res) === 'object') {
          console.log(res.body);
        }
      }
      const res: any = await this.adminItemService.getUploadImages().toPromise()
      this.uploadImages = res.imagesList
      this.loaderService.hideLoader()
    }
  }

  storeNewOrder($event, dst: string) {
    if ($event.currentOrder.length === $event.previousOrder.length) {
      if (!this.requestUploadImages && !this.requestItemImages) {
        if (dst == "item") {
          this.itemImages = $event.currentOrder.filter(item => item != undefined)
        } else {
          this.uploadImages = $event.currentOrder.filter(item => item != undefined)
        }
      } else {
        this.itemImages = this.requestItemImages
        this.uploadImages = this.requestUploadImages
        this.requestItemImages = null
        this.requestUploadImages = null
      }
    }
  }

  onItemDrop($event, dst: string) {
    if (dst == "item") {
      this.requestUploadImages = this.uploadImages.filter(item => item.id != $event.dragData.id)
      this.requestItemImages = this.itemImages
      this.requestItemImages.push($event.dragData)
    } else {
      this.requestUploadImages = this.uploadImages
      this.requestUploadImages.push($event.dragData)
      this.requestItemImages = this.itemImages.filter(item => item.id != $event.dragData.id)
    }
  }
}
