import { Component, OnInit } from '@angular/core';

import { PropertyGrpcService } from 'src/app/shared/services/property.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'type', 'sort', 'actions']
  columnDefs = ["position", "name", "weight", "symbol", 'actions']
  propertiesData: any
  total: number

  constructor(
    private propertyService: PropertyGrpcService,
  ) { }

  async ngOnInit() {
    let res = await this.propertyService.properties(0, environment.pageSizeOptions[0], null, null).toPromise()
    this.updatePropertiesData(res)
  }

  async changePage(event) {
    let res = await this.propertyService.properties(event.pageIndex, event.pageSize, event.sort, event.direction).toPromise()
    this.updatePropertiesData(res)
  }

  updatePropertiesData(data) {
    this.propertiesData = data.propertiesList.map((item, index) => {
      return {
        ...item, position: data.position + index,
        actions: `<button mat-raised-button><i class="glyphicon glyphicon-edit"></i></button><button mat-raised-button><i class="glyphicon glyphicon-trash"></i></button>`
      }
    })
    this.total = data.total
  }
}
