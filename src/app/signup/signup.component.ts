import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

  /*
  Validator 同步參數(第二個) / 非同步參數(第三個)
  */
  formData = new FormGroup({
    personName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl(''),
    send: new FormControl(''),
    address: new FormGroup({
      addressType: new FormControl('home'),
      city: new FormControl(''),
      area: new FormControl(''),
      zipcode: new FormControl(''),
      address: new FormControl(''),
    })
  });

  constructor(private http: HttpClient) {
    this.http.get('../../assets/data/cityarea.json')
    .subscribe(data => {
      this.cityTownZipCode = data;
      this.cityOptions = Object.keys(data);
    });
  }

  ngOnInit() {
    this.formData.get('address.city').valueChanges
    .subscribe(cityValue => this.queryAreaOption(cityValue));

    this.formData.get('address.area').valueChanges
    .subscribe(areaValue => this.queryZipeOption(areaValue));
  }
  queryAreaOption(city) {
    this.address.city = city;
    this.areaOptions = Object.entries(
      this.cityTownZipCode[city]).map(([key, value]) => {
        return { key, value};
      }
    );
  }
  queryZipeOption(area) {
    console.log(area);
    const zipCodeControl = this.formData.get('address.zipcode') as FormControl;
    zipCodeControl.setValue(area.value);
    zipCodeControl.patchValue(area.value);
    zipCodeControl.reset(area.value);

  }

  get cityControl() {
    return this.formData.get('address.city');
  }
}
