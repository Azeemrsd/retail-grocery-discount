import { Component } from "@angular/core";

@Component({
  selector: "app-newproduct",
  templateUrl: "./newproduct.component.html",
  styleUrls: ["./newproduct.component.css"]
})
export class NewproductComponent {
  constructor() {}
  //defining Properties
  product = "";
  price: number = null;
  products: { id: any; product: string; price: number }[] = [];
  totalPrice = 10;
  totalDiscount = 0;
  payableAmount = 10;
  customerType = "Select Any One";

  //Called whenever user select any type from dropdown
  selected(value) {
    // console.log(value)
    switch (value) {
      case "New Customer":
        const hundreds = this.totalPrice / 100;
        //Logic for $5 dicount on every $100

        this.totalDiscount = ~~hundreds * 5;
        this.payableAmount = this.totalPrice - this.totalDiscount;
        break;
      case "Employee":
        //Calculating discount 30% for employees
        this.totalDiscount = 0.3 * this.totalPrice;
        this.totalDiscount.toFixed(2);
        this.payableAmount = this.totalPrice - this.totalDiscount;
        this.payableAmount.toFixed(2);
        break;
      case "Affiliate":
        //Calculating discount 10% for Affiliate
        this.totalDiscount = 0.1 * this.totalPrice;
        this.totalDiscount.toFixed(2);
        this.payableAmount = this.totalPrice - this.totalDiscount;
        this.payableAmount.toFixed(2);
        break;
      case "2 year old":
        //calculating 5% discount for 2 year old customers
        this.totalDiscount = 0.05 * this.totalPrice;
        this.totalDiscount.toFixed(2);
        this.payableAmount = this.totalPrice - this.totalDiscount;
        this.payableAmount.toFixed(2);
      default:
        break;
    }
  }

  //Adding new product
  onProductAdded() {
    //converting string into number type
    this.totalPrice = +this.totalPrice + +this.price;
    //pushing product into the array
    this.products.push({
      id: Math.random(),
      product: this.product,
      price: this.price
    });
    this.product = "";
    this.price = null;
    //Recalculating Discount and netPayable amount
    this.selected(this.customerType);
  }

  //Deleting a product from the list
  onDeleteProduct(id) {
    //finding index of the clicked product
    const removeIndex = this.products
      .map(product => {
        return product.id;
      })
      .indexOf(id);
    //Decrementing total price after deleting a product
    this.totalPrice = this.totalPrice - this.products[removeIndex].price;
    //Removing element from the array usnig splice()
    this.products.splice(removeIndex, 1);
    //Recalculating Discount and netPayable amount
    this.selected(this.customerType);
  }
  //editing a product
  onEditProduct(id) {
    //finding element to be edited
    const editIndex = this.products
      .map(product => {
        return product.id;
      })
      .indexOf(id);
    //Pushing values into the input fields
    this.product = this.products[editIndex].product;
    this.price = this.products[editIndex].price;
    //Removing element from products
    this.products.splice(editIndex, 1);
    //Recalculating total price and discount price
    this.totalPrice = this.totalPrice - this.price;
    this.selected(this.customerType);
  }
}
