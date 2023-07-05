import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //from payapl
  public payPalConfig?: IPayPalConfig;
  //paypal showsuccess
  showSuccess:boolean=false

  proccedtopay:boolean=false

  discountStatus:boolean=false
  offerClick:boolean=false
  //to hold payment status information
  paymentStatus:boolean=false;
  username:any
  housenumber:any
   //to hold total price
   totalPrice:number=0

  allCart:any=[]
   constructor(private api:ApiService,private paymentFB:FormBuilder){} 
   //form group
   paymentFrom=this.paymentFB.group({
    //form array
    username:['',[Validators.required,Validators.pattern('[a-zA-Z " "]*')]],
    housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    street:['',[Validators.required,Validators.pattern('[a-z]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    mobilenumber:['',[Validators.required,Validators.pattern('[0-9]*')]]

   }) 

    ngOnInit(): void {
      //paypal function call
      this.initConfig();
      this.api.getAllCart().subscribe((result:any)=>{
        console.log(result);
        this.allCart=result;
        this.getCartTotal()
      },
      (result:any)=>{
        console.log(result.error);  
      }
      )
    }

    deleteCart(id:any){
      this.api.deleteCart(id).subscribe((result:any)=>{
        this.allCart=result
        alert('product remove')
        this.api.cartCount()
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }
    getCartTotal(){
      let total=0;
      this.allCart.forEach((item:any)=>{
        total=total+item.grandTotal
        this.totalPrice=Math.ceil( total)
      })

    }
    //increment 
    incrementCart(id:any){
      this.api.incrementCartCount(id).subscribe((result:any)=>{
        this.allCart=result
        this.getCartTotal()
      },
     (result:any)=>{
      alert(result.error)
     } 
      )
    }

    //decrement
    decrementCart(id:any){
      this.api.decrementCartCount(id).subscribe((result:any)=>{
        this.allCart=result
        this.getCartTotal()
      },
      (result:any)=>{
       alert(result.error)
      }
      )
    }
       makepay(){
        this.proccedtopay=true
       }
    submitForm(){
      //check the address is valid
      if(this.paymentFrom.valid){
           this.paymentStatus=true
           this.username=this.paymentFrom.value.username
           this.housenumber=this.paymentFrom.value.housenumber
      }else{
        alert("Please enter valid details")
      }
    }
    offerClicked(){
      this.offerClick=true
    }
    discount(value:any){
       this.totalPrice=Math.ceil(this.totalPrice*(100-value)/100)
       this.offerClick=false
       this.discountStatus=true
    }
    modalclose(){
      this.paymentFrom.reset()
      this.showSuccess=false
      this.paymentStatus=false
    }
//paypal function
    private initConfig(): void {
      this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }
}
