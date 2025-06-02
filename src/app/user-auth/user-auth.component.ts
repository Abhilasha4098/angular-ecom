import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authErorr: string = '';
  constructor(private user: UserService,private product:ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.UserLogin(data);
    this.user.invalidUserAuth.subscribe((isError) => {
      console.warn('Apple', isError);
      if (isError) {
        this.authErorr = 'Email or password is not correct';
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 100); // slight delay to allow localStorage to be updated
      }
    });
  }
  
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList:product[] = JSON.parse(data);
 cartDataList.forEach((product: product,index)=> {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId      };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('Item stored in DB');
            }
        });
if(cartDataList.length===index+1){
          localStorage.removeItem('localCart');      
}
        },500);
    });
  
}
setTimeout(() => {
  this.product.getCartList(userId);
}, 2000); 
  }
}
