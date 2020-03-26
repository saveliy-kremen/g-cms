import { Component, OnInit, ViewChild } from '@angular/core';

import { PropertyGrpcService } from 'src/app/shared/services/property.service';

const ELEMENT_DATA = [
  {
    position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', actions: `<button mat-raised-button><i class="glyphicon glyphicon-edit"></i></button><button mat-raised-button><i class="glyphicon glyphicon-trash"></i></button>`
  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions']
  dataSource = ELEMENT_DATA
  length = 20
  columnDefs = ["position", "name", "weight", "symbol", 'actions']
  propertiesData: any

  constructor(
    private propertyService: PropertyGrpcService,
  ) { }

  async ngOnInit() {
    let res = await this.propertyService.properties().toPromise()
    console.log(res)
    this.propertiesData = res.propertiesList
  }

  changePage(event) {
    console.log(event)
  }
}
