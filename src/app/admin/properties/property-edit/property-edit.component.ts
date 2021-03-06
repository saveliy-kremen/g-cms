import { Component, ViewChild, ElementRef, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Message } from 'src/app/shared/models/message.model'
import { environment } from 'src/environments/environment'
import { AdminPropertyGrpcService } from 'src/app/shared/services/grpc/admin-property.service'
import { LoaderService } from 'src/app/shared/services/loader.service'

import { PropertyValueComponent } from '../property-value/property-value.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/modal/modal.service';

declare var $: any

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss']
})
export class PropertyEditComponent implements OnInit {
  @ViewChild('modalPropertyValueDelete') public modalPropertyValueDelete: ElementRef

  propertyForm: FormGroup
  propertyFormSubmitted: boolean
  propertyMessage: Message = new Message("success", "")
  propertyTypes = environment.propertyTypes
  propertyDisplayTypes = environment.propertyDisplayTypes

  categoriesData: any
  uploadUrl: string = environment.siteUrl + "/uploads/properties/"

  editing: boolean
  property: any = {}
  propertyValues: any = [];
  propertyValuesPage: number = 0
  propertyValuesPageSize: number = 0
  propertyValuesSort: string
  propertyValuesDirection: string
  propertyValueID: number;

  displayedColumns: string[] = ['position', 'value', 'sort', 'actions']
  columnDefs = [
    { column: "value", title: "Value", translate: true, sort: true },
    { column: "sort", title: "Sort", translate: true, sort: true },
  ]
  actions = []

  constructor(
    private router: Router,
    private adminPropertyService: AdminPropertyGrpcService,
    private loaderService: LoaderService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private translateService: TranslateService,
    private activeRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.propertyForm = new FormGroup({
      title: new FormControl('', Validators.required),
      code: new FormControl(''),
      type: new FormControl('', Validators.required),
      display: new FormControl('', Validators.required),
      required: new FormControl(''),
      multiple: new FormControl(''),
      sort: new FormControl('', Validators.required),
    })
    this.propertyForm.patchValue({ type: 0, display: 0 })

    this.loaderService.showLoader()
    this.editing = this.activeRoute.snapshot.params["mode"] == "edit"
    if (this.editing) {
      let res: any = await this.adminPropertyService.property(Number(this.activeRoute.snapshot.params["id"])).toPromise()
      this.property = res.property
      if (this.property.type == environment.propertyTypes.findIndex(item => item === "Изображение")) {
        this.displayedColumns = ['position', 'value', 'imageElement', 'sort', 'actions']
        this.columnDefs = [
          { column: "value", title: "Value", translate: true, sort: true },
          { column: "imageElement", title: "Image", translate: true, sort: false },
          { column: "sort", title: "Sort", translate: true, sort: true },
        ]
      }
      this.propertyValuesPage = 0;
      this.propertyValuesPageSize = environment.pageSizeOptions[0]
      this.updatePropertyValues()
      this.propertyForm.patchValue(this.property)
      this.propertyMessage = new Message("success", "")
      res = await this.adminPropertyService.propertyCategories(Number(this.activeRoute.snapshot.params["id"])).toPromise()
      this.categoriesData = res.categoriesList
    }
    this.loaderService.hideLoader()
  }

  updatePropertyValues() {
    this.property.valuesList = this.property.valuesList.map((item, index) => {
      return {
        ...item,
        imageElement: `<img src="${this.uploadUrl + this.property.id}/${item.image}" width="30" height="30">`,
        actions: [
          { icon: "edit", class: "button-edit", handler: this.showPropertyValueModal.bind(this), id: item.id },
          { icon: "delete", class: "button-delete", handler: this.deletePropertyValueConfirm.bind(this), id: item.id }
        ]
      }
    })
    this.propertyValues = this.property.valuesList.slice(this.propertyValuesPage, this.propertyValuesPageSize)
  }

  onTabChange(event) {
    if (event.index == 2) {
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
      await this.adminPropertyService.propertyBindCategory(
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
      await this.adminPropertyService.propertyUnbindCategory(
        Number(this.activeRoute.snapshot.params["id"]),
        data.node.id
      );
    } catch (err) {
      console.log(err)
    }
    this.loaderService.hideLoader()
  }

  async submitPropertyForm() {
    this.loaderService.showLoader()
    this.propertyFormSubmitted = true;
    if (this.propertyForm.valid) {
      try {
        this.propertyForm.value.id = this.editing ? Number(this.activeRoute.snapshot.params["id"]) : null
        await this.adminPropertyService.editProperty(this.propertyForm.value).toPromise()
        this.propertyFormSubmitted = false;
        this.propertyMessage = new Message("success", "");
        this.propertyForm.reset();
        this.router.navigateByUrl("/admin/properties");
      } catch (err) {
        this.propertyMessage = new Message("danger", err.message);
        console.log(this.propertyMessage);
      }
    }
    this.loaderService.hideLoader()
  }

  changePage($event) {
    this.propertyValuesPage = $event.pageIndex;
    this.propertyValuesPageSize = $event.pageSize;
    this.propertyValuesSort = $event.sort
    this.propertyValuesDirection = $event.direction
    let propertyValues = this.property.valuesList
    propertyValues.sort(function (a, b) {
      let res = 0
      if (a[this.propertyValuesSort] < b[this.propertyValuesSort]) {
        res = -1
      }
      if (a[this.propertyValuesSort] > b[this.propertyValuesSort]) {
        res = 1
      }
      return this.propertyValuesDirection == "asc" ? res : -res
    }.bind(this))
    this.propertyValues = propertyValues.slice(this.propertyValuesPage * this.propertyValuesPageSize, (this.propertyValuesPage + 1) * this.propertyValuesPageSize)
  }

  showPropertyValueModal(id): void {
    let propertyValue: any = {}
    if (id) {
      propertyValue = this.propertyValues.filter(item => item.id === id)[0]
    }
    const dialogRef = this.dialog.open(PropertyValueComponent, {
      width: '350px',
      data: { property: this.property, propertyValue: propertyValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.property = result
        this.property.valuesList = this.property.valuesList.map((item, index) => {
          return {
            ...item,
            actions: [
              { icon: "edit", class: "button-edit", handler: this.showPropertyValueModal.bind(this), id: item.id },
              { icon: "delete", class: "button-delete", handler: this.deletePropertyValueConfirm.bind(this), id: item.id }
            ]
          }
        })
        this.propertyValues = this.property.valuesList.slice(this.propertyValuesPage * this.propertyValuesPageSize, (this.propertyValuesPage + 1) * this.propertyValuesPageSize)
      }
    });
  }


  async deletePropertyValueConfirm(id) {
    this.propertyValueID = id;
    const value = this.property.valuesList.filter(item => item.id === id)[0];
    const modalData = {
      title: await this.translateService.get("Delete property value").toPromise(),
      text: await this.translateService.get("Delete property value").toPromise() + ` "${value.value}"?`,
      callBackFunction: this.deletePropertyValue.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deletePropertyValue(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.adminPropertyService.deletePropertyValue(this.propertyValueID).toPromise()
        this.property = res.property
        this.updatePropertyValues()
      }
    } catch (err) {
      this.propertyMessage = new Message("danger", err.message);
      console.log(this.propertyMessage);
    }
    this.loaderService.hideLoader()
  }
}
