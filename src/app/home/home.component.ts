import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { product } from '../data-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined |product[];
  trendyProducts: undefined |product[];


  
  constructor(private product:ProductService) { }
  ngOnInit(): void {
    this.product.popularProduct().subscribe((data)=>{
    
      this.popularProducts=data;  
      
    })
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProducts=data;
    })
    
}
  
  

}