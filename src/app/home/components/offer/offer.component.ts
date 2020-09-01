import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  uploadUrl = environment.siteUrl + "/uploads/"
  @Input() offer
  @Input() product

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addProduct(offer) {
    this.cartService.addProduct(offer)
  }
}
