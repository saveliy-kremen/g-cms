import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Message } from 'src/app/shared/models/message.model';
import { environment } from 'src/environments/environment';
import { CategoryGrpcService } from 'src/app/shared/services/grpc/category.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: any;

  categoryForm: FormGroup;
  categoryFormSubmitted: boolean = false;
  categoryMessage: Message = new Message("success", "");
  uploadUrl: string = environment.siteUrl + "/uploads/categories/";
  image: String;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private categoryService: CategoryGrpcService,
    private activeRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.categoryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      description: new FormControl(''),
    })
    this.loaderService.showLoader()
    try {
      let res = await this.categoryService.category(this.activeRoute.snapshot.params["alias"]).toPromise()
      this.category = res.category;
      this.categoryForm.patchValue({ ...this.category, title: this.category.text });
      this.image = this.category.image !== "" ? this.uploadUrl + this.category.id + "/" + this.category.image : "";
      this.categoryMessage = new Message("success", "");
    } catch (err) {
      console.log(err)
    }
    this.loaderService.hideLoader()
  }

  async submitCategoryForm() {
    this.loaderService.showLoader()
    this.categoryFormSubmitted = true;
    if (this.categoryForm.valid) {
      try {
        this.categoryForm.value.oldAlias = this.activeRoute.snapshot.params["alias"]
        this.categoryForm.value.image = this.image
        await this.categoryService.editCategory(this.categoryForm.value).toPromise()
        this.categoryFormSubmitted = false;
        this.image = null;
        this.categoryMessage = new Message("success", "");
        this.categoryForm.reset();
        this.router.navigateByUrl("/admin/categories");
      } catch (err) {
        this.categoryMessage = new Message("danger", err.message);
        console.log(this.categoryMessage);
      }
    }
    this.loaderService.hideLoader()
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
}
