import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import{FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined|product[];
  productMessage:undefined|string;
  icon=faTrash;
  iconEdit=faEdit;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.List();}
  deleteProduct(id:number){
    console.warn("tested id",id);
  this.product.deleteProduct(id).subscribe((result)=>{
    console.warn(result);
    if(result){
     this.productMessage="Product is deleted successfully"
     this.List();
    }
  })
  setTimeout(()=>{
    this.productMessage=undefined;
  },3000)
  }
List(){
  this.product.productList().subscribe((data)=>{
    console.warn(data);
    this.productList=data;

    
  })

}}
