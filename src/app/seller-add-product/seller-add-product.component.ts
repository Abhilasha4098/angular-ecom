import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addproductMsg:string|undefined;
 
  constructor(private product:ProductService, private router:Router) { }

  ngOnInit(): void {
  }

 submit(data:product){
    console.warn(data);
    this.product.addproduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addproductMsg="Product has been added successfully";
        
        setTimeout(()=>{
          this.addproductMsg=undefined;
          this.router.navigate(['/seller-home']); 
        },3000)

        
      
       }
} )

  }

  
  
  
  
}
