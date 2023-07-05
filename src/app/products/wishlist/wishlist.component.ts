import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  //to hold the product details
  allwishlist:any=[]
    constructor(private api:ApiService){}
    ngOnInit(): void {
      this.api.getAllWishlist().subscribe((result:any)=>{
        console.log(result);
        this.allwishlist=result;
        
      },
      (result:any)=>{
        console.log(result.error);
        
      })
     
    }
    deleteWhislist(id:any){
      //delete api call
      this.api.removeWishlist(id).subscribe((result:any)=>{
        this.allwishlist=result
        alert('product deleted sucessfully')
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

    addToCart(product:any){
   
      //add quantity to cart
      Object.assign(product,{quantity:1})
      console.log(product);
      //api call to add quantity
      this.api.addToCart(product).subscribe((result:any)=>{
        this.api.cartCount()
        this.deleteWhislist(product.id)
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

}
