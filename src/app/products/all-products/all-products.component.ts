import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  //to hold the products details
  allproducts:any=[] 
   
  searchTerm: string=""

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{
      console.log(result);//array(20)
      this.allproducts=result;
    })
    // this.searchTerm=this.api.searchTerm
    // console.log(this.searchTerm);
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm=result;
      console.log(this.searchTerm);
      
    })
  }

}
