import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  cartProducts: any[] = []

  addProduct(product) {
    this.cartProducts.push(product)
  }
}
