import { UserService } from './../../../services/user.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css']
})
export class HeadNavComponent implements OnInit,OnDestroy {
  sub?:Subscription;
  temp?:any;
  constructor(public auth:AuthService, private location:Location, private _user:UserService) { }

  ngOnInit(): void {
    this.sub = 
    this.auth.user$.subscribe(user=>{
      console.log("User: ",user);
      this.temp = user;
      // on success full redirect the location seems to change after the home component load
      this.location.replaceState('./');
      let sub_ = this._user.verifyUser(user as any).subscribe(d=>{
        if (d){
          console.log("User exists in api database")
        }else{
          //create user in api database
          let sub__ = this._user.createUser(user as any).subscribe(d=>{
            console.log("User added in api database")
          })
          sub__.unsubscribe();
        }
      })
      sub_.unsubscribe();
    })
  }
  logIn(){
    this.auth.loginWithRedirect();
  }
  logOut(){
    this.auth.logout()
  }
  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }
  test(){
    this._user.createUser(this.temp).subscribe(d=>{
      console.log("User added in api database")
    })
  }
}
