import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { AdminItemGrpcService } from 'src/app/shared/services/grpc/admin-item.service';
import { Message } from 'src/app/shared/models/message.model';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'image', 'article', 'price', 'sort', 'actions']
  columnDefs = [
    { column: "title", title: "Title", translate: true, sort: true },
    { column: "image", title: "Image", translate: true, sort: false },
    { column: "article", title: "Article", translate: true, sort: true },
    { column: "price", title: "Price", translate: true, sort: true },
    { column: "sort", title: "Sort", translate: true, sort: true },
  ]
  actions = []
  itemsData: any
  itemsMessage: Message
  itemsPage: number = 0
  itemsPageSize: number
  itemsSort: string
  itemsDirection: string
  itemID: number
  total: number
  uploadUrl: string

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private adminItemService: AdminItemGrpcService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.itemsPage = 0
    this.itemsPageSize = environment.pageSizeOptions[0]
    let res: any = await this.authService.getUser()
    this.uploadUrl = `${environment.siteUrl}/uploads/users/${res.id}/items/`
    const savedTable = this.storageService.getTable("items")
    if (savedTable != null) {
      this.itemsPage = savedTable.page
      this.itemsSort = savedTable.sort
      this.itemsDirection = savedTable.direction
    }
    res = await this.adminItemService.items(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection).toPromise()
    this.updateItemsData(res)
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    this.itemsPage = event.pageIndex
    this.itemsPageSize = event.pageSize
    this.itemsSort = event.sort
    this.itemsDirection = event.direction
    this.storageService.saveTable("items", JSON.stringify({ page: this.itemsPage, sort: this.itemsSort, direction: this.itemsDirection }))
    let res = await this.adminItemService.items(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection).toPromise()
    this.updateItemsData(res)
  }

  editAction(id) {
    this.router.navigate(["/admin/items/edit", id])
  }

  updateItemsData(data) {
    this.itemsData = data.itemsList.map((item, index) => {
      let imageSrc = ""
      if (item.imagesList && item.imagesList.length > 0) {
        imageSrc = `${this.uploadUrl + item.id}/${item.imagesList[0].filename}`
      } else if (item.offersList && item.offersList.length > 0) {
        if (item.offersList[0].imagesList && item.offersList[0].imagesList.length > 0) {
          imageSrc = `${this.uploadUrl + item.offersList[0].id}/${item.offersList[0].imagesList[0].filename}`
        }
      }
      let price = item.price
      if (price == 0 && item.offersList && item.offersList.length > 0) {
        const minPrice = item.offersList.reduce((min, offer) => offer.price < min ? offer.price : min, item.offersList[0].price);
        const maxPrice = item.offersList.reduce((max, offer) => offer.price > max ? offer.price : max, item.offersList[0].price);
        price = `${minPrice} - ${maxPrice}`
      }
      return {
        ...item,
        image: `<img src="${imageSrc}" alt="${item.title}" width="100" height="120">`,
        price: price,
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editAction.bind(this), id: item.id },
          { icon: "delete", class: "button-delete", handler: this.deleteItemConfirm.bind(this), id: item.id }
        ],
      }
    })
    this.total = data.total
  }

  async deleteItemConfirm(id) {
    this.itemID = id;
    const item = this.itemsData.filter(item => item.id == id)[0];
    const modalData = {
      title: await this.translateService.get("Delete item").toPromise(),
      text: await this.translateService.get("Delete item").toPromise() + ` "${item.title}"?`,
      callBackFunction: this.deleteItem.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteItem(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.adminItemService.deleteItem(this.itemID, this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection).toPromise()
        this.updateItemsData(res)
      }
    } catch (err) {
      this.itemsMessage = new Message("danger", err.message);
    }
    this.loaderService.hideLoader()
  }
}
