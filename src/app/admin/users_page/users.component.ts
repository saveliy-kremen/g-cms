import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserGrpcService } from 'src/app/shared/services/grpc/user.service';
import { Message } from 'src/app/shared/models/message.model';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'fullname', 'shopName', 'phone', 'email', 'role', 'active', 'actions']
  columnDefs = [
    { column: "fullname", title: "Fullname", translate: true, sort: true },
    { column: "shopName", title: "ShopName", translate: true, sort: true },
    { column: "phone", title: "Phone", translate: true, sort: true },
    { column: "email", title: "Email", translate: true, sort: true },
    { column: "role", title: "Role", translate: true, sort: true },
    { column: "active", title: "Active", translate: true, sort: true },
  ]
  actions = []
  usersData: any
  usersMessage: Message

  itemsPage: number = 0
  itemsPageSize: number
  itemsSort: string
  itemsDirection: string
  itemID: number
  total: number
  uploadUrl: string = `${environment.siteUrl}/uploads/items/`;

  subscriptions: Subscription[] = []
  search: string;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private searchService: SearchService,
    private userService: UserGrpcService,
    private translateService: TranslateService,
    private modalService: ModalService,
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.itemsPage = 0
    this.itemsPageSize = environment.pageSizeOptions[0]
    let res: any = await this.userService.users(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection, this.search).toPromise()
    await this.updateItemsData(res)
    this.subscriptions.push(this.searchService.search$.subscribe(async (value) => {
      this.search = value
      let res = await this.userService.users(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection, this.search).toPromise()
      await this.updateItemsData(res)
    }, (err) => {
      console.log(err)
    }))
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    this.itemsPage = event.pageIndex
    this.itemsPageSize = event.pageSize
    this.itemsSort = event.sort
    this.itemsDirection = event.direction
    let res = await this.userService.users(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection, this.search).toPromise()
    await this.updateItemsData(res)
  }

  async updateItemsData(data) {
    let usersData = [];
    for (const user of data.usersList) {
      usersData.push({
        ...user,
        role: await this.translateService.get(environment.roles[user.role]).toPromise(),
        active: await this.translateService.get(user.active ? "yes" : "no").toPromise(),
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editAction.bind(this), id: user.id },
          { icon: "delete", class: "button-delete", handler: this.deleteItemConfirm.bind(this), id: user.id }
        ],
      })
    }
    this.usersData = usersData
    this.total = data.total
  }

  editAction(id) {
    this.router.navigate(["/admin/users/edit", id])
  }

  async deleteItemConfirm(id) {
    this.itemID = id;
    const user = this.usersData.filter(item => item.id == id)[0];
    const modalData = {
      title: await this.translateService.get("Deleting user").toPromise(),
      text: await this.translateService.get("Delete user").toPromise() + ` "${user.name}"?`,
      callBackFunction: this.deleteUser.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteUser(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.userService.deleteUser(this.itemID, this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection).toPromise()
        this.updateItemsData(res)
      }
    } catch (err) {
      this.usersMessage = new Message("danger", err.message);
    }
    this.loaderService.hideLoader()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
