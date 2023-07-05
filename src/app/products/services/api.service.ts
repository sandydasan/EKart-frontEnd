import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //to hold crt count 
  getCartItemCount= new BehaviorSubject(0)//inital value is 0

  //to hold search term
   searchTerm=new BehaviorSubject('')

//backend path
  BASE_URL='http://localhost:5000'

  constructor(private http:HttpClient) {
    this.cartCount()
   }

  //get all products
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  //view particular product
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/viewproducts/${id}`) 
  }

  //add to wishlist product
  addToWishlist(id:any,title:string,price:any,image:string){
    const body={
     id,
     title,
     price,
     image
    }
    return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
  }
  //get all wishlist 
  getAllWishlist() {
    return this.http.get(`${this.BASE_URL}/product/getwishlist`)
  }

  //delete alitem
  removeWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/product/deletewishlist/${id}`)
  }

  //add to cart
  addToCart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
  }

  //get all cart
  getAllCart(){
    return this.http.get(`${this.BASE_URL}/products/getcart`)
  }

  //delete cart
  deleteCart(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)
  }

  cartCount(){
    this.getAllCart().subscribe((result:any)=>{
    this.getCartItemCount.next(result.length);//cart count= length of cart array

    })
  }
  incrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/product/increment/${id}`)
  }
  decrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/product/decrement/${id}`)
  }
}
