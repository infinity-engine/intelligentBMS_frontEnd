import { _TestChamber } from './../models/TestChamber';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, share } from 'rxjs/operators';
import { User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestChamberService {
  constructor(private http: HttpClient) {}

  getChambers(){
    return this.http.get(`${environment.apiUri}/api/protected/test-chamber`).pipe(share(),retry(3),catchError(this.errorHandler));
  }
  createNewTestChamber(chamberConfig: _TestChamber) {
    //angular stripped out the key which has the value undefined.
    //console.log(chamberConfig);
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber`, 
        {...chamberConfig})
      .pipe(retry(3), catchError(this.errorHandler));
  }
  
  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(
        `Something went wrong with the network. Error status : ${error.status}`
      );
    } else {
      console.error(`Backed has rejected the request. ${error.error}`);
    }
    return throwError(() => new Error(error.error));
  }
}
