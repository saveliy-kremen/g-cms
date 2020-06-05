import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderGrpcService } from 'src/app/shared/services/grpc/order.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RefDirective } from 'src/app/shared/directives/ref.directive';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  @ViewChild(RefDirective) refDir: RefDirective

  cartProducts = []
  currentCardProduct: any
  totalPrice = 0
  added = ''

  form: FormGroup
  submitted = false

  constructor(
    private cartService: CartService,
    private orderService: OrderGrpcService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.cartProducts = this.cartService.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  showModal(cartProduct) {
    this.currentCardProduct = cartProduct
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent)
    this.refDir.containerRef.clear()

    const component = this.refDir.containerRef.createComponent(modalFactory)

    component.instance.title = 'Dynamic title'
    component.instance.close.subscribe((confirm) => {
      this.refDir.containerRef.clear()
      if (confirm) {
        this.delete(this.currentCardProduct)
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      itemIds: this.cartProducts.map(item => item.id),
    }

    this.orderService.addOrder(order).subscribe(res => {
      this.form.reset()
      this.added = 'Delivery is framed'
      this.submitted = false
    })
  }

  delete(product) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }
}
