import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { ItemGrpcService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  itemsData: any
  itemsPage: number = 0
  itemsPageSize: number = 12
  itemsSort: string
  itemsDirection: string
  total: number
  uploadUrl: string

  products$

  constructor(
    private loaderService: LoaderService,
    private itemService: ItemGrpcService,
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.products$ = this.itemService.items(this.itemsPage, this.itemsPageSize, this.itemsSort, this.itemsDirection)
    this.loaderService.hideLoader()
  }
}

