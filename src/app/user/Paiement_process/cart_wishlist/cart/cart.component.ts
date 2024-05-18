import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../../../model/Cart.model";
import {CartService} from "../../../../../service/cart/cart.service";




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cart: Cart = new Cart();
    quantity: number = 1;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.getCartDetails();

    }

    getCartDetails(): void {
        this.cartService.getCart()
            .subscribe(cart => {
                this.cart = cart;
            });
    }

    calculateSubtotal(price: number, quantity: number): number {
        return price * quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

}
