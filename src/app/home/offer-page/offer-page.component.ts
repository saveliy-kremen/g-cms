import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ItemGrpcService } from 'src/app/shared/services/item.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent implements OnInit {
  offer$
  uploadUrl = environment.siteUrl + "/uploads/"

  constructor(
    private loaderService: LoaderService,
    private itemService: ItemGrpcService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader()
    this.offer$ = this.route.params
      .pipe(switchMap(params => {
        return this.itemService.item(params['id']).pipe(map((res) => {
          return {
            ...res.item
          }
        }))
      }))
    this.loaderService.hideLoader()
  }

  addProduct(offer) {
    this.cartService.addProduct(offer)
  }
}
