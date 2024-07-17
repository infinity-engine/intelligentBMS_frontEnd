import { Test } from 'src/app/models/Test';
import { _TestChamber } from './../models/TestChamber';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestChamberService {
  constructor(private http: HttpClient) {}

  getChambers(chamberId: any = undefined) {
    let params = new HttpParams();
    if (chamberId) {
      params = params.set('chamberId', chamberId);
    }
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber`, {
        params: params,
      })
      .pipe(share(), retry(3), catchError(this.errorHandler));
  }
  createNewTestChamber(chamberConfig: _TestChamber) {
    //angular stripped out the key which has the value undefined.
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber`, {
        ...chamberConfig,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }
  deleteTestChamber(chamberId: string) {
    let params = new HttpParams();
    params = params.set('chamberId', chamberId);
    return this.http
      .delete(`${environment.apiUri}/api/protected/test-chamber`, {
        params: params,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }
  updateTestChamber(chamberConfig: _TestChamber) {
    return this.http
      .put(`${environment.apiUri}/api/protected/test-chamber`, {
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
  getAllTests() {
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber/all-tests`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getTestData(chamberId: string, testId: string): Observable<any> {
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber/get-test-data`, {
        chamberId: chamberId,
        testId: testId,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  deleteTest(chamberId: string, testId: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('chamberId', chamberId);
    params = params.set('testId', testId);
    return this.http
      .delete(`${environment.apiUri}/api/protected/test-chamber/delete-test`, {
        params: params,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getConnectionStatus(chamberId: string, delay: number = 10000) {
    let params = new HttpParams();
    if (chamberId) {
      params = params.set('chamberId', chamberId);
    }
    if (delay) {
      params = params.set('delay', delay);
    }
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber/is-connected`, {
        params: params,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getAPIKey(chamberId: string) {
    let params = new HttpParams();
    if (chamberId) {
      params = params.set('chamberId', chamberId);
    }
    return this.http
      .get(`${environment.apiUri}/api/protected/test-chamber/api-key`, {
        params: params,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getQuickResponse(
    chamberId: string,
    testId: string,
    channelNo: number,
    indexAfter: number = 0
  ): Observable<any> {
    return this.http
      .post(
        `${environment.apiUri}/api/protected/test-chamber/get-test-result`,
        {
          chamberId: chamberId,
          testId: testId,
          channelNo: channelNo,
          indexAfter: indexAfter,
        }
      )
      .pipe(retry(3), catchError(this.errorHandler));
  }

  forceStatus(
    chamberId: string,
    testId: string,
    forceStatus: string | null
  ): Observable<any> {
    return this.http
      .post(`${environment.apiUri}/api/protected/test-chamber/force-status`, {
        chamberId: chamberId,
        testId: testId,
        forcedStatus: forceStatus,
      })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  downloadTestResult(
    chamberId: string,
    testId: string,
    channelNo: number
  ): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'text/csv',
      }),
      responseType: 'blob' as const,
      observe: 'response' as const,
    };
    const body = {
      chamberId: chamberId,
      testId: testId,
      channelNo: channelNo,
    };
    return this.http
      .post(
        `${environment.apiUri}/api/protected/test-chamber/download-test-result`,
        body,
        option
      )
      .pipe(catchError(this.errorHandler));
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
