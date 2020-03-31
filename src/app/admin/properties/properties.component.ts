import { Component, OnInit } from '@angular/core';

import { PropertyGrpcService } from 'src/app/shared/services/grpc/property.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'type', 'sort', 'actions']
  columnDefs = [
    { column: "title", title: "t_Title", sort: true },
    { column: "type", title: "t_Type", sort: true },
    { column: "sort", title: "t_Sort", sort: true },
  ]
  actions = []
  propertiesData: any
  propertiesMessage: Message
  propertyPage: number = 0
  propertyPageSize: number
  propertySort: string
  propertyDirection: string
  propertyID: number
  total: number

  constructor(
    private propertyService: PropertyGrpcService,
    private loaderService: LoaderService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.propertyPage = 0
    this.propertyPageSize = environment.pageSizeOptions[0]
    let res = await this.propertyService.properties(this.propertyPage, this.propertyPageSize, this.propertySort, this.propertyDirection).toPromise()
    this.updatePropertiesData(res)
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    this.propertyPage = event.pageIndex
    this.propertyPageSize = event.pageSize
    this.propertySort = event.sort
    this.propertyDirection = event.direction
    let res = await this.propertyService.properties(this.propertyPage, this.propertyPageSize, this.propertySort, this.propertyDirection).toPromise()
    this.updatePropertiesData(res)
  }

  editAction(id) {
    this.router.navigate(["/admin/properties/edit", id])
  }

  updatePropertiesData(data) {
    this.propertiesData = data.propertiesList.map((item, index) => {
      return {
        ...item,
        type: environment.propertyTypes[item.type],
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editAction.bind(this), id: item.id },
          { icon: "delete", class: "button-delete", handler: this.deletePropertyConfirm.bind(this), id: item.id }
        ],
      }
    })
    this.total = data.total
  }

  async deletePropertyConfirm(id) {
    this.propertyID = id;
    const property = this.propertiesData.filter(item => item.id == id)[0];
    const modalData = {
      title: await this.translateService.get("Delete property").toPromise(),
      text: await this.translateService.get("Delete property").toPromise() + ` "${property.title}"?`,
      callBackFunction: this.deletePropertyValue.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deletePropertyValue(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        const res = await this.propertyService.deleteProperty(this.propertyID, this.propertyPage, this.propertyPageSize, this.propertySort, this.propertyDirection).toPromise()
        this.updatePropertiesData(res)
      }
    } catch (err) {
      this.propertiesMessage = new Message("danger", err.message);
      console.log(this.propertiesMessage);
    }
    this.loaderService.hideLoader()
  }
}
