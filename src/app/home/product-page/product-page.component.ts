import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { ItemGrpcService } from 'src/app/shared/services/item.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$

  constructor(
    private loaderService: LoaderService,
    private itemService: ItemGrpcService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.itemService.item(params['id']).pipe(map((res) => {
          return {
            ...res.item
          }
        }))
      }))
    this.loaderService.hideLoader()
  }
}
