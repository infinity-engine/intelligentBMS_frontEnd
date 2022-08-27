import { DeviceDataLight } from './../models/DeviceData';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {

  constructor(private http:HttpClient) { }

  getDeviceDataLight(){
    return this.http.get<DeviceDataLight[]>('/e_mobility/i-bms/assets/DevicesDataLight.json').pipe(retry(3),catchError(this.errorHandler));
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
