import { Component, OnInit } from '@angular/core';

import { PropertyGrpcService } from 'src/app/shared/services/grpc/property.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';

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
  total: number

  constructor(
    private propertyService: PropertyGrpcService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    let res = await this.propertyService.properties(0, environment.pageSizeOptions[0], null, null).toPromise()
    this.updatePropertiesData(res)
    this.loaderService.hideLoader()
  }

  async changePage(event) {
    let res = await this.propertyService.properties(event.pageIndex, event.pageSize, event.sort, event.direction).toPromise()
    this.updatePropertiesData(res)
  }

  editAction(id) {
    this.router.navigate(["/admin/properties/edit", id])
  }

  deleteAction(id) {
    console.log("delete", id)
  }

  updatePropertiesData(data) {
    this.propertiesData = data.propertiesList.map((item, index) => {
      return {
        ...item,
        type: environment.propertyTypes[item.type],
        actions: [
          { icon: "edit", class: "button-edit", handler: this.editAction.bind(this), id: item.id },
          { icon: "delete", class: "button-delete", handler: this.deleteAction.bind(this), id: item.id }
        ],
      }
    })
    this.total = data.total
  }
}
