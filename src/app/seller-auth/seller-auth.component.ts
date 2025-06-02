import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router){}

  showLogin:boolean=false;
  authError:string='';

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data:signUp):void{
   
    this.seller.userSingUP(data)  

  }
  login(data:login):void{
  this.authError='';
   this.seller.userLogin(data);
  this.seller.isloginError.subscribe((isError)=>{
    if(isError){
      this.authError="Email or passward is not correct";
    }
  })

  }

  openLogin(){
  this.showLogin=true;
  }
  opensignUp(){
    this.showLogin=false;
    }

}
