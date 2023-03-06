import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showCoverPage: boolean = false;
  showCoverImage: boolean = false;
  showAssessmentPage: boolean = true;



  admin:any={
    "email":"pothala.kumar.19cse@bmu.edu.in",
    "password":"123456"
  }
  constructor() { }
  userForm:FormGroup
  ngOnInit(): void {
    this.userForm = new FormGroup({

      'email' : new FormControl('',[Validators.required,Validators.email,Validators.pattern(this.admin['email'])]),
      'password' : new FormControl('',
    [Validators.required,Validators.minLength(5),Validators.pattern(this.admin['password'])])
    })
  }
  goToCoverPage(event: any){
    this.showCoverPage = true;
    this.showCoverImage = true;
    this.showAssessmentPage = false;
  }

}
