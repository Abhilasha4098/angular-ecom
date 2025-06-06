import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSrllerLoggedIn=new BehaviorSubject<boolean>(false)
  isloginError=new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }
  userSingUP(data:signUp){
  this.http.post('http://localhost:3000/seller',
  data,
  {observe:'response'}).subscribe((result)=>{
    this.isSrllerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home'])
  });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSrllerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:login){
    console.warn(data)
   this.http.get(`http://localhost:3000/seller?email=${data.email}&passward=${data.passward}`,
    {observe:'response'}
   ).subscribe((result:any)=>{
    console.warn(result);
    if(result && result.body && result.body.length)
    {
console.warn("user logged in")
localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed");
      this.isloginError.emit(true)
    }
   })
  }
}
