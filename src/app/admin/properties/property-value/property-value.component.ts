import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/models/message.model';
import { PropertyGrpcService } from 'src/app/shared/services/grpc/property.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-value',
  templateUrl: './property-value.component.html',
  styleUrls: ['./property-value.component.scss']
})
export class PropertyValueComponent implements OnInit {
  propertyValueForm: FormGroup
  propertyValueFormSubmitted: boolean
  propertyValueMessage: Message = new Message("success", "")
  uploadUrl: string = environment.siteUrl + "/uploads/properties/";
  image: string


  constructor(
    private propertyService: PropertyGrpcService,
    public dialogRef: MatDialogRef<PropertyValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.propertyValueForm = new FormGroup({
      value: new FormControl('', Validators.required),
      sort: new FormControl('', Validators.required),
    })
    this.propertyValueForm.patchValue(this.data.propertyValue);
    if (this.data.propertyValue.image) {
      this.getBase64Image(this.uploadUrl + this.data.propertyValue.id + "/" + this.data.propertyValue.image, base64image => {
        this.image = base64image
      });
    }
    console.log(this.image)
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
    this.propertyValueFormSubmitted = true;
    if (this.propertyValueForm.valid) {
      try {
        this.propertyValueForm.value.image = this.image
        const res = await this.propertyService.editPropertyValue(
          this.data,
          this.propertyValueForm.value,
        ).toPromise();
        console.log(res)
        //this.property = res.data.editPropertyValue;
        this.propertyValueFormSubmitted = false;
        this.propertyValueMessage = new Message("success", "");
        this.propertyValueForm.reset();
        this.dialogRef.close();
      } catch (err) {
        this.propertyValueMessage = new Message("danger", err.message);
        console.log(this.propertyValueMessage);
      }
    }
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

