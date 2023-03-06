import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-ang-mater',
  templateUrl: './ang-mater.component.html',
  styleUrls: ['./ang-mater.component.css']
})
export class AngMaterComponent implements OnInit {

  userForm: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      'name': new FormControl('pavan',Validators.required),
      'email' : new FormControl('email',[Validators.required,Validators.email]),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'message' : new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  get name() {
    return this.userForm.get('name');
  }


}
