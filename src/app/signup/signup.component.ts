import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  cityTownZipCode;
  areaOptions;
  cityOptions;
  address = {
    city: '',
    town: '',
    zipcode: ''
  };

  constructor(private http: HttpClient) {
    this.http.get('../../assets/data/cityarea.json')
    .subscribe(data => {
      this.cityTownZipCode = data;
      this.cityOptions = Object.keys(data);
    });
  }

  ngOnInit() {}
  queryAreaOption(city) {
    this.address.city = city;
    this.areaOptions = Object.entries(
      this.cityTownZipCode[city]).map(([key, value]) => {
        return { key, value};
      }
    );
  }
  queryZipeOption(town) {
    this.address.town = town;
    this.address.zipcode = town.value;
  }
}
