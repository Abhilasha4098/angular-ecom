import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { product } from '../data-type';


@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];

  constructor(private activeRoute: ActivatedRoute, private product:ProductService) {}

  ngOnInit(): void {
 let query = this.activeRoute.snapshot.paramMap.get('query');
 console.log(query); // Use the query parameter as needed
   query && this.product.searchProduct(query).subscribe((data)=>{
    this.searchResult=data;
    
    
  })
}
  }
  // Handle the search results as needed