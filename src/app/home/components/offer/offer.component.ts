import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  @Input() offer

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addProduct(offer) {
    this.cartService.addProduct(offer)
  }
}
