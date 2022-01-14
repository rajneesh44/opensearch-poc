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
  // tslint:disable-next-line: align
  cities = [];
  cities2 = [];
  async check(){
    let res = await axios.get('http://localhost:3000/api/v1/test');
    console.log("res", res, this.search);
  }

  async sendTheNewValue(event){
    this.search = event.target.value;
    console.log('search', this.search);
    if(this.search.length){
      let response = await axios.get(`http://localhost:3000/api/v1/city/search?name=${this.search}`);
      console.log('response', response);
      for(let city of response.data){
        this.cities.push(city);
      }
      this.cities2 = this.cities;
      this.cities = [];
    }
      else{
        if (this.cities.length || this.cities2.length) {
          this.cities = [];
          this.cities2 = [];
        }

      }
  }
}
