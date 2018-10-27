import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  index: number;

  @Output() removeEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  remove(index) {
    console.log(index);
    this.removeEvent.emit(index);
  }
}
