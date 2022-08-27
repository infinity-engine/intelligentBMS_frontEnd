import { TestResultDeep, TestResultLight } from './../models/TestResult';
import { catchError,retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  constructor(private http:HttpClient) { }

  getTestDataLight(){
    return this.http.get<TestResultLight[]>('/e_mobility/i-bms/assets/TestDataLight.json').pipe(retry(3),catchError(this.errorHandler));
  }

  getTestDataDeep(){
    return this.http.get<TestResultDeep['Charge/discharge experiment']>('/e_mobility/i-bms/assets/TestDataDeep.json').pipe(retry(3),catchError(this.errorHandler));
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
