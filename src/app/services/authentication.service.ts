import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { authState } from 'rxfire/auth';

import { concatMap, from, Observable, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  currentUser$ = authState(this.auth)

  constructor(private auth:Auth) { }


  login(username:string,password:string){
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }


  logout(){
    return from(this.auth.signOut())
  }


  signUp(name:string,email:string,password:string){

    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(switchMap(({user})=>updateProfile(user,{displayName : name})))

  }






}
