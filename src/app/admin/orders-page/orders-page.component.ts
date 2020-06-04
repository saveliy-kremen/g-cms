import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { AdminOrderGrpcService } from 'src/app/shared/services/grpc/admin-order.service';
import { Message } from 'src/app/shared/models/message.model';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'phone', 'address', 'payment', 'price', 'actions']
  columnDefs = [
    { column: "date", title: "Date", translate: true, sort: true },
    { column: "name", title: "Fullname", translate: true, sort: true },
    { column: "phone", title: "Phone", translate: true, sort: true },
    { column: "address", title: "Address", translate: true, sort: true },
    { column: "payment", title: "Payment", translate: true, sort: true },
    { column: "price", title: "Price", translate: true, sort: true },
  ]
  actions = []
  ordersData: any
  ordersMessage: Message
  ordersPage: number = 0
  ordersPageSize: number
  ordersSort: string
  ordersDirection: string
  orderID: number
  total: number
  uploadUrl: string

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private adminOrderService: AdminOrderGrpcService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.ordersPage = 0
    this.ordersPageSize = environment.pageSizeOptions[0]
    let res: any = await this.authService.getUser()
    this.uploadUrl = `${environment.siteUrl}/uploads/users/${res.id}/items/`
    res = await this.adminOrderService.orders(this.ordersPage, this.ordersPageSize, this.ordersSort, this.ordersDirection).toPromise()
    this.updateOrdersData(res)
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    this.ordersPage = event.pageIndex
    this.ordersPageSize = event.pageSize
    this.ordersSort = event.sort
    this.ordersDirection = event.direction
    let res = await this.adminOrderService.orders(this.ordersPage, this.ordersPageSize, this.ordersSort, this.ordersDirection).toPromise()
    this.updateOrdersData(res)
  }

  updateOrdersData(data) {
    this.ordersData = data.ordersList.map((order, index) => {
      let price = order.itemsList.reduce(function (price, current) {
        return price + current.price;
      }, 0)
      return {
        ...order,
        date: this.datePipe.transform(order.date.seconds * 1000, 'dd/MM/yyyy(EEE) - hh:mmaaa'),
        price: price,
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editAction.bind(this), id: order.id },
          { icon: "delete", class: "button-delete", handler: this.deleteOrderConfirm.bind(this), id: order.id }
        ],
      }
    })
    this.total = data.total
  }

  editAction(id) {
    this.router.navigate(["/admin/orders/edit", id])
  }

  async deleteOrderConfirm(id) {
    this.orderID = id;
    const order = this.ordersData.filter(item => item.id == id)[0];
    const modalData = {
      title: await this.translateService.get("Delete order").toPromise(),
      text: await this.translateService.get("Delete order").toPromise() + ` "${order.name}"?`,
      callBackFunction: this.deleteOrder.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteOrder(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.adminOrderService.deleteOrder(this.orderID, this.ordersPage, this.ordersPageSize, this.ordersSort, this.ordersDirection).toPromise()
        this.updateOrdersData(res)
      }
    } catch (err) {
      this.ordersMessage = new Message("danger", err.message);
    }
    this.loaderService.hideLoader()
  }
}
