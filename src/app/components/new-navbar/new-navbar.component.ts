import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';

import { get } from 'jquery';
import { switchMap } from 'rxjs';


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



@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.css']
})
export class NewNavbarComponent implements OnInit {

  modalOpen: any = false;

  toggleModal(){
    this.modalOpen = true;
  }

  showProfile: any  = false;

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




  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(public authService: AuthenticationService,
    private router:Router,
    private toast : HotToastService) { }

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
