import { DOCUMENT } from '@angular/common';
import { Attribute, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { get } from 'jquery';
import { switchMap } from 'rxjs';


import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

declare var $:JQueryStatic


@Component({
  selector: 'app-new-cover',
  templateUrl: './new-cover.component.html',
  styleUrls: ['./new-cover.component.css']
})
export class NewCoverComponent implements OnInit {

  modalOpen: any = false;
  x:any=''
  toggleModal(){
    this.modalOpen = true;
  }

  showProfile: any  = false;


  Organisationform=new FormGroup({
    industrySector: new FormControl(null, [Validators.required]),
    OrgName: new FormControl('',[Validators.required]),
    revenue: new FormControl(null,[Validators.required]),
    employeeCount : new FormControl(null,[Validators.required])
  })

  abcd:any
  IndustrySectors = ['One','Two','Three']
  get industrySector() {
    return this.Organisationform.get('industrySector');
  }
  get revenue(){
    return this.Organisationform.get('revenue');
  }
  get OrgName(){
    return this.Organisationform.get('OrgName');
  }
  get employeeCount(){
    return this.Organisationform.get('employeeCount');
  }






  disp:any=false;
  k:any

  proceed(){

    this.disp=true;

    if (this.Organisationform.valid) {
      console.log(this.Organisationform.get('OrgName')?.value)
      let organisation:any={}
      organisation.name = this.Organisationform.get('OrgName')?.value;
      organisation['revenue'] = this.Organisationform.get('revenue')?.value;
      organisation['employeeCount'] = this.Organisationform.get('employeeCount')?.value;
      organisation['sector'] = this.Organisationform.get('industrySector')?.value;
      console.log(organisation)
      this.service.org(organisation.name);
      this.service.postOrganizationDetails(organisation).subscribe(response=>{
        console.log(response);
        this.router.navigate(['/survey'])
      });
    }



    // this.x="modal";
  }

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup(
    {
      signUpname: new FormControl('', Validators.required),
      signUpemail: new FormControl('', [Validators.required, Validators.email]),
      signUppassword: new FormControl('', Validators.required),
      signUpconfirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );






  constructor(public authService: AuthenticationService,
    private router: Router,
    private toast : HotToastService,
    @Inject(DOCUMENT) document: Document,
    private service: DataTransferService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate([''])
    })
  }

  submit(){
    if (!this.loginForm.valid) {
      return;
    }


    const{email,password} = this.loginForm.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success:"Logged in sucessfully",
        loading:"Logging in....",
        error:'There was an error'
      })
    ).subscribe(()=>{
      this.router.navigate(['/about'])
    });

    this.showProfile = true;
  }


  get  signUpemail() {
    return this.signUpForm.get('signUpemail');
  }

  get  signUppassword() {
    return this.signUpForm.get('signUppassword');
  }

  get  signUpconfirmPassword() {
    return this.signUpForm.get('signUpconfirmPassword');
  }

  get  signUpname() {
    return this.signUpForm.get('signUpname');
  }

  signUpsubmit() {
    console.log(this.signUpForm.get('signUpname')?.value)
    if (!this.signUpForm.valid) {
      return;
    }

    const { signUpname, signUpemail, signUppassword } = this.signUpForm.value;
    this.authService.signUp(signUpname,signUpemail,signUppassword).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });

  }

}
