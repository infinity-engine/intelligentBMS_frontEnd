import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { retry,catchError, share } from 'rxjs/operators';
import { User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  verifyUser(user:User){
    let qParrams = new HttpParams()
    qParrams = qParrams.append('sub',user.sub as any)
    return this.http.get(`${environment.apiUri}/api/users`,{params:qParrams}).pipe(share(),catchError(this.errorHandler),retry(3));
  }
  createUser(user:User){
    return this.http.post(`${environment.apiUri}/api/users`,{...user}).pipe(catchError(this.errorHandler),retry(3));
  }

  private errorHandler(error:HttpErrorResponse){
    if(error.status === 0){
      console.error(`Something went wrong with the network. Error status : ${error.status}`);
    }else{
      console.error(`Backed has rejected the request. ${error.error}`);
    }
    return throwError(() => new Error(error.error));
  }
}
