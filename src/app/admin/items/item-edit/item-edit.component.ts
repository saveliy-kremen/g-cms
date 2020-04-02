import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Message } from 'src/app/shared/models/message.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItemGrpcService } from 'src/app/shared/services/grpc/item.service';

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
  uploadUrl: string = environment.siteUrl + "/uploads/properties/"

  editing: boolean

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private itemService: ItemGrpcService,
    private activeRoute: ActivatedRoute
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
    }
    this.loaderService.hideLoader()
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
      //.bind("select_node.jstree", this.bindProperty.bind(this))
      //.bind("deselect_node.jstree", this.unbindProperty.bind(this))
    } else {
      $("#categoryTree").jstree("destroy");
    }
  }

  async submitItemForm() {
    this.loaderService.showLoader()
    this.itemFormSubmitted = true;
    if (this.itemForm.valid) {
      try {
        console.log(this.itemForm.value)
        this.itemForm.value.id = this.editing ? Number(this.activeRoute.snapshot.params["id"]) : null
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
}
