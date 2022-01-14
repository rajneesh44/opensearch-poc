import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-search';
  search: string;
  selectedId: string;
  showCard= false;
  // tslint:disable-next-line: align
  products = [];
  products2 = [];
  // tslint:disable-next-line: typedef
  async check(){
    const res = await axios.get('http://localhost:3000/api/v1/test');
    console.log("res", res, this.search);
  }

  async sendTheNewValue(event){
    this.search = event.target.value;
    console.log('search', this.search);
    if (this.search.length){
      const response = await axios.get(`http://localhost:3000/api/v1/product/search?sq=${this.search}`);
      console.log('response', response);
      for (const product of response.data){
        this.products.push(product);
      }
      this.products2 = this.products;
      this.products = [];
    }
      else{
        if (this.products.length || this.products2.length) {
          this.products = [];
          this.products2 = [];
          this.selectedId = '';
        }

      }
  }

  // highlightRow(product){
  //   this.selectedId = product.id;
  //   console.log('selectedId', this.selectedId);
  // }
  highlightRow(product){
    this.showCard = true;
    this.selectedId = product.id;
  }
}
