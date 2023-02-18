import { UserService } from './../../../services/user.service';
import { of, Subscription, switchMap, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css'],
})
export class HeadNavComponent implements OnInit, OnDestroy {
  sub?: Subscription;
  authUser?: any;
  constructor(
    private auth: AuthService,
    private location: Location,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    const os$:Observable<any> = this.auth.user$.pipe(
      switchMap((firstResponse: any) => {
        this.authUser = firstResponse;
        if (this.authUser) {
          return this._user.verifyUser(this.authUser as any).pipe(
            switchMap((secondResponse: any) => {
              if (secondResponse) {
                return of('Exists on API DB');
              } else {
                return this._user.createUser(this.authUser as any).pipe(switchMap((thirdResponse:any)=>{
                  if (thirdResponse){
                    return of("Inserted in API DB")
                  }else{
                    return of("Inset failed of API DB")
                  }
                }))
              }
            })
          );
        } else {
          return of(null);
        }
      })
    );
    this.sub = os$.subscribe(msg =>{
      console.log("User: ",msg)
    })
  }
  logIn() {
    this.auth.loginWithRedirect();
  }
  logOut() {
    this.auth.logout();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
