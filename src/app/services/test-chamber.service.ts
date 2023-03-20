import { Test } from 'src/app/models/Test';
import { _TestChamber } from './../models/TestChamber';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestChamberService {
  constructor(private http: HttpClient) {}

  getChambers() {
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber`)
      .pipe(share(), retry(3), catchError(this.errorHandler));
  }
  createNewTestChamber(chamberConfig: _TestChamber) {
    //angular stripped out the key which has the value undefined.
    //console.log(chamberConfig);
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber`, {
        ...chamberConfig,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }
  createTest(chamberId: string, testConfig: Test) {
    //console.log(testConfig);
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber/create-test`, {
        chamberId: chamberId,
        testConfig: testConfig,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }
  getLiveTests() {
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber/live-tests`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getTestData(chamberId: string, testId: string): Observable<any> {
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber/test-data`, {
        chamberId: chamberId,
        testId: testId,
      })
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
