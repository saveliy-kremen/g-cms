import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Message } from 'src/app/shared/models/message.model';
import { environment } from 'src/environments/environment';
import { PropertyGrpcService } from 'src/app/shared/services/property.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

declare var $: any;

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss']
})
export class PropertyEditComponent implements OnInit {
  @ViewChild('modalPropertyValueDelete') public modalPropertyValueDelete: ElementRef;

  propertyForm: FormGroup;
  propertyFormSubmitted: boolean;
  propertyMessage: Message = new Message("success", "");
  propertyTypes = environment.propertyTypes;
  propertyDisplayTypes = environment.propertyDisplayTypes;

  propertyValueForm: FormGroup;
  propertyValueFormSubmitted: boolean;
  propertyValueMessage: Message = new Message("success", "");
  imageProperty: boolean;
  numberProperty: boolean;
  uploadUrl: string = environment.siteUrl + "/upload/properties/";
  file: File;
  preview: String;
  valueEditing: boolean;
  propertyValueID: number;

  categoriesData: any;

  editing: boolean;
  property: any = {};
  loading: boolean;

  //modal
  modalPropertyValueTitle: string;

  //modal
  modalPropertyValueDeleteTitle: string;
  modalPropertyValueDeleteText: string;
  modalPropertyValueDeleteButtons: any = [{ title: "Delete", handler: this.deletePropertyValue.bind(this) }];

  constructor(
    private router: Router,
    private propertyService: PropertyGrpcService,
    private loaderService: LoaderService,
    private activeRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.propertyForm = new FormGroup({
      title: new FormControl('', Validators.required),
      code: new FormControl(''),
      type: new FormControl('', Validators.required),
      display: new FormControl('', Validators.required),
      plural: new FormControl(''),
      sort: new FormControl('', Validators.required),
    })
    this.propertyForm.patchValue({ type: 0, display: 0 });

    this.propertyValueForm = new FormGroup({
      value: new FormControl(''),
      sort: new FormControl('', Validators.required),
    })

    this.loaderService.showLoader()
    this.editing = this.activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      const res: any = await this.propertyService.property(Number(this.activeRoute.snapshot.params["id"])).toPromise();
      this.property = res.property;
      this.propertyForm.patchValue(this.property);
      this.propertyMessage = new Message("success", "");
      this.loading = false;
    }

    //const res: any = await this.graphql.propertyCategories(Number(this.activeRoute.snapshot.params["id"]));
    //this.categoriesData = res.data.propertyCategories;
    this.imageProperty = this.propertyForm.value.type == environment.propertyTypes.findIndex(item => item === "Изображение");
    this.numberProperty = this.propertyForm.value.type == environment.propertyTypes.findIndex(item => item === "Число");

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
    this.loaderService.hideLoader()
  }

  async bindProperty(evt, data) {
    try {
      //await this.graphql.propertyBindCategories(
      //  Number(this.activeRoute.snapshot.params["id"]),
      //  data.node.id
      // );
    } catch (err) {
      console.log(err)
    }
  }

  async unbindProperty(evt, data) {
    try {
      //await this.graphql.propertyUnbindCategories(
      //  Number(this.activeRoute.snapshot.params["id"]),
      //  data.node.id
      // );
    } catch (err) {
      console.log(err)
    }
  }

  async submitPropertyForm() {
    this.propertyFormSubmitted = true;
    if (this.propertyForm.valid) {
      try {
        this.propertyForm.value.id = this.editing ? Number(this.activeRoute.snapshot.params["id"]) : null
        await this.propertyService.editProperty(this.propertyForm.value)
        this.propertyFormSubmitted = false;
        this.propertyMessage = new Message("success", "");
        this.propertyForm.reset();
        this.router.navigateByUrl("/admin/properties");
      } catch (err) {
        this.propertyMessage = new Message("danger", err.message);
        console.log(this.propertyMessage);
      }
    }
  }

  async submitPropertyValueForm() {
    this.propertyValueFormSubmitted = true;
    if (this.propertyValueForm.valid) {
      try {
        /*
        const res = await this.graphql.editPropertyValue(
          this.propertyValueID,
          this.property.id,
          this.propertyValueForm.value.value,
          Number(this.propertyValueForm.value.numberValue),
          Number(this.propertyValueForm.value.sort),
          this.file,
        );
        this.property = res.data.editPropertyValue;
        */
        this.propertyValueFormSubmitted = false;
        this.propertyValueMessage = new Message("success", "");
        this.propertyValueForm.reset();
        this.preview = null;
        $('#modalPropertyValue').modal('hide');
      } catch (err) {
        this.propertyValueMessage = new Message("danger", err.message);
        console.log(this.propertyValueMessage);
      }
    }
  }

  async showPropertyValueModal(id) {
    this.propertyValueID = id;
    this.imageProperty = this.propertyForm.value.type == environment.propertyTypes.findIndex(item => item === "Изображение");
    this.numberProperty = this.propertyForm.value.type == environment.propertyTypes.findIndex(item => item === "Число");
    if (id) {
      this.valueEditing = true;
      const property = this.property.values.filter(item => item.id === id)[0];
      this.propertyValueForm.patchValue(property);
      this.modalPropertyValueTitle = "Редактирование значения";
    } else {
      this.valueEditing = false;
      this.modalPropertyValueTitle = "Добавление значения";
    }
    $('#modalPropertyValue').modal('show');
  }

  addPropertyValue() {
    console.log("add value")
  }

  deletePropertyValueConfirm(id) {
    this.propertyValueID = id;
    const value = this.property.values.filter(item => item.id === id)[0];
    this.modalPropertyValueDeleteTitle = "Delete Property Value";
    this.modalPropertyValueDeleteText = `Delete property value"${value.value}" ?`;
    $('#modalPropertyValueDelete').modal('show');
  }

  async deletePropertyValue() {
    try {
      this.loading = true;
      //const res = await this.graphql.deletePropertyValue(this.propertyValueID);
      //this.property = res.data.deletePropertyValue;
      $('#modalPropertyValueDelete').modal('hide');
    } catch (err) {
      console.log(err)
      this.modalPropertyValueDeleteTitle = err.message;
    }
  }
}