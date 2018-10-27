import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
// import { Observable, debounceTime, pipe } from 'rxjs';


function ValidaConfirmEmail(c: AbstractControl) {
  console.log(c);
  if (c.get('email').value !== c.get('confirmEmail').value ) {
  return {confirmEmail: true};
}
return null;
}

/*
自定義驗證
*/
function SetMinLength(len: number): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value.length < len) {
      return {'customLength': true};
    }
  };
}

@Component({
  selector: 'app-singup-advance',
  templateUrl: './singup-advance.component.html',
  styleUrls: ['./singup-advance.component.css']
})
export class SingupAdvanceComponent implements OnInit {

formData = this.fb.group({
  name: ['', [SetMinLength(10)]],
  phone: '',
  emailGroup: this.fb.group({
    email: ['', [Validators.required]],
    confirmEmail: ['', []]
  }),
  send: '',
  notifyWay: 'email',
  addressList: this.fb.array([this.createAddressList()])
});

/*
formData2 = new FormGroup({
  name: new FormControl('', [Validators.required]),
  confrimEmail: new FormControl('', [Validators.required]),
  phone: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  send: new FormControl(''),
  notifyWay: new FormControl('email'),
  address: new FormGroup({
    addressType: new FormControl('home'),
    city: new FormControl(''),
    area: new FormControl(''),
    zipcode: new FormControl(''),
    address: new FormControl(''),
  })
});
*/

  constructor(private fb: FormBuilder) {

   }

  ngOnInit() {
    this.formData.get('notifyWay').valueChanges
    .subscribe(notifyWay => {
      console.log(notifyWay);
      if (notifyWay === 'text') {
        this.formData.get('phone').setValidators([Validators.required]);
        this.formData.get('phone').updateValueAndValidity();
      } else if (notifyWay === 'email') {
        this.formData.get('phone').clearValidators();
        this.formData.get('phone').updateValueAndValidity();
      }
    });

    // this.formData.get('name').valueChanges.pipe(
    //   debounceTime(500), mergeMap(inputValue => this.http.get(''))
    //   .subscribe(data => this.data = data);
    // );

  }

  get addressListArray() {
    return this.formData.get('addressList') as FormArray;
  }

  createAddressList() {
    return this.fb.group({
      addressType: 'home',
      city: '',
      area: '',
      zipcode: '',
      address: ''
    });
  }
  addNew() {
    this.addressListArray.push(this.createAddressList());
  }
  remove(index) {
    console.log(index);
    this.addressListArray.removeAt(index);
  }

}
