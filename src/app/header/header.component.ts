import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string='';
  userName:string='';
  SeachResult:undefined|product[];
   cartItems=0;
  constructor(private router: Router,private product:ProductService) { 
    
   
  }

  ngOnInit(): void {
   
   this.router.events.subscribe((value:any) => {
   
    if(value.url){

      if(localStorage.getItem('seller') && value.url.includes('seller')){
        let sellerStore=localStorage.getItem('seller');
          let sellerData= sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType="seller";
        
      }
      else if (localStorage.getItem('user') ){
        let userStore=localStorage.getItem('user');
        let userData= userStore && JSON.parse(userStore);
        this.userName=userData.name;
        this.menuType='user';
        this.product.getCartList(userData.id);

      } else{
        this.menuType='default';
      }
    }
  }
)
  let cartData=localStorage.getItem('localCart');
  if(cartData){
   this.cartItems=JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((items)=>{
    this.cartItems=items.length;
  })
  
}
logout(){
  localStorage.removeItem('seller');
  this.router.navigate(['/']);
 
}
userLogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/user-auth']);
  this.product.cartData.emit([]);
}
searchProduct(query:KeyboardEvent){
  if(query){
    const element= query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((result)=>{
      console.warn(result);
      if(result.length>5){
        result.length=5;
      }

      this.SeachResult=result;
    })
  }
}
hideSearch(){
  this.SeachResult=undefined;
  // (document.getElementById('search') as HTMLInputElement).value='';
  // (document.getElementById('search') as HTMLInputElement).style.display='none';
}
submitSearch(value:string){
  console.warn(value);
  this.router.navigate([`search/${value}`]);
}
redirectToDeatails(id:number){
  this.router.navigate([`/details/${id}`]);

}}