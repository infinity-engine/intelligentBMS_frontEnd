import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css']
})
export class HeadNavComponent implements OnInit {

  constructor(public auth:AuthService, private location:Location) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      console.log("User: ",user);
      // on success full redirect the location seems to change after the home component load
      this.location.replaceState('./');
    })
  }
  logIn(){
    this.auth.loginWithRedirect({redirect_uri:"https://www.iitg.ac.in/e_mobility/i-bms/"});
  }
  logOut(){
    this.auth.logout({returnTo:"https://www.iitg.ac.in/e_mobility/i-bms/"})
  }

}
