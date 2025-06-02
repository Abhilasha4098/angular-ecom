import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cartData:cart[] | undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    deliveryCharges:0,
    tax:0,
    totalAmount:0 
  }

  constructor(private product:ProductService,private router:Router){}

  

  ngOnInit(): void {
    this.loadDetails();
  }
  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
     this.loadDetails()
   })
  }
  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          
price=price+(+item.price* +item.quantity);}
      });
      this.priceSummary.price = price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/100;
      this.priceSummary.deliveryCharges=100;
      this.priceSummary.totalAmount=price+this.priceSummary.tax+this.priceSummary.deliveryCharges-this.priceSummary.discount;
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    });
  }
  checkout(){
    this.router.navigate(['/checkout']);
}
}
