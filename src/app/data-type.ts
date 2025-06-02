export interface signUp{
    name:string,
    passward:string,
    email:string
}
export interface login{   
    email:string,
    passward:string
}
export interface product{
     id:number,
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    quantity:undefined | number,
   productId:undefined|number,
}
export interface cart{
   
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    id:number|undefined,
    quantity:undefined | number,
    userId:number,
    productId:number,

}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    deliveryCharges:number,
    totalAmount:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}

