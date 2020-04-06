import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Message } from 'src/app/shared/models/message.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItemGrpcService } from 'src/app/shared/services/grpc/item.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var $: any

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup
  itemFormSubmitted: boolean
  itemMessage: Message = new Message("success", "")
  item: any = {}
  categoriesData: any
  uploadUrl: string = environment.siteUrl

  editing: boolean

  itemImages: any = []
  uploadImages: any = []
  requestItemImages: any
  requestUploadImages: any

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private itemService: ItemGrpcService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private uploadService: UploadService,
  ) { }

  async ngOnInit() {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      article: new FormControl(''),
      alias: new FormControl(''),
      description: new FormControl('', Validators.required),
      price: new FormControl(''),
      oldPrice: new FormControl(''),
      currencyID: new FormControl(''),
      count: new FormControl(''),
      disable: new FormControl(''),
      sort: new FormControl('', Validators.required),
    })

    this.loaderService.showLoader()
    this.editing = this.activeRoute.snapshot.params["mode"] == "edit"
    if (this.editing) {
      let res: any = await this.itemService.item(Number(this.activeRoute.snapshot.params["id"])).toPromise()
      this.item = res.item
      this.itemForm.patchValue(this.item)
      this.itemImages = this.item.imagesList
      res = await this.itemService.getUploadImages().toPromise()
      this.uploadImages = res.imagesList
      res = await this.itemService.itemCategories(Number(this.activeRoute.snapshot.params["id"])).toPromise()
      this.categoriesData = res.categoriesList
      res = await this.authService.getUser()
      this.uploadUrl += `/uploads/users/${res.id}/items/`
    }
    this.loaderService.hideLoader()
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
      await this.itemService.itemBindCategory(
        Number(this.activeRoute.snapshot.params["id"]),
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
      await this.itemService.itemUnbindCategory(
        Number(this.activeRoute.snapshot.params["id"]),
        data.node.id
      );
    } catch (err) {
      console.log(err)
    }
    this.loaderService.hideLoader()
  }

  async submitItemForm() {
    this.loaderService.showLoader()
    this.itemFormSubmitted = true;
    if (this.itemForm.valid) {
      try {
        this.itemForm.value.id = this.editing ? Number(this.activeRoute.snapshot.params["id"]) : null
        this.itemForm.value.itemImages = this.itemImages.map(item => item.id)
        this.itemForm.value.uploadImages = this.uploadImages.map(item => item.id)
        await this.itemService.editItem(this.itemForm.value)
        this.itemFormSubmitted = false;
        this.itemMessage = new Message("success", "");
        this.itemForm.reset();
        this.router.navigateByUrl("/admin/items");
      } catch (err) {
        this.itemMessage = new Message("danger", err.message);
        console.log(this.itemMessage);
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
      const res: any = await this.itemService.getUploadImages().toPromise()
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
