import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/models/message.model';
import { AdminPropertyGrpcService } from 'src/app/shared/services/grpc/admin-property.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-property-value',
  templateUrl: './property-value.component.html',
  styleUrls: ['./property-value.component.scss']
})
export class PropertyValueComponent implements OnInit {
  propertyValueForm: FormGroup
  propertyValueFormSubmitted: boolean
  propertyValueMessage: Message = new Message("success", "")
  uploadUrl: string = environment.siteUrl + "/uploads/properties/"
  isImageProperty: boolean
  image: string


  constructor(
    private adminPropertyService: AdminPropertyGrpcService,
    public dialogRef: MatDialogRef<PropertyValueComponent>,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.propertyValueForm = new FormGroup({
      value: new FormControl('', Validators.required),
      sort: new FormControl('', Validators.required),
    })
    this.propertyValueForm.patchValue(this.data.propertyValue);
    if (this.data.propertyValue.image) {
      this.getBase64Image(this.uploadUrl + this.data.propertyValue.propertyId + "/" + this.data.propertyValue.image, base64image => {
        this.image = base64image
      });
    }
    this.isImageProperty = this.data.property.type == environment.propertyTypes.findIndex(item => item === "Изображение");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect($event) {
    if ($event.addedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent) {
        const content = (e.target as FileReader).result;
        this.image = content;
      }.bind(this);
      reader.readAsDataURL($event.addedFiles[0]);
    }
  }

  async submitPropertyValueForm() {
    this.loaderService.showLoader()
    this.propertyValueFormSubmitted = true;
    if (this.propertyValueForm.valid) {
      try {
        this.propertyValueForm.value.image = this.image
        const res = await this.adminPropertyService.editPropertyValue(
          this.data,
          this.propertyValueForm.value,
        ).toPromise();
        this.propertyValueFormSubmitted = false;
        this.propertyValueMessage = new Message("success", "");
        this.propertyValueForm.reset();
        this.dialogRef.close(res.property);
      } catch (err) {
        this.propertyValueMessage = new Message("danger", err.message);
        console.log(this.propertyValueMessage);
      }
    }
    this.loaderService.hideLoader()
  }

  public getBase64Image(imgUrl, callback) {
    var img = new Image();
    // onload fires when the image is fully loadded, and has width and height
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      callback(dataURL); // the base64 string
    };
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;
  }
}

