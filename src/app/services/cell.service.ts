import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError, share } from 'rxjs/operators';
import { User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { Cell } from '../models/Cell';

@Injectable({
  providedIn: 'root',
})
export class CellService {
  constructor(private http: HttpClient) {}

  getTemplates() {
    return this.http
      .get(`${environment.apiUri}/api/protected/cell/cell-templates`)
      .pipe(share(), retry(3), catchError(this.errorHandler));
  }
  addCell(cell: Cell) {
    return this.http
      .post(`${environment.apiUri}/api/protected/cell/cell-info`, cell)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getCellForExperiment(searchStr: string) {
    //return on the cells on which you can perform an experiment
    // in other words in which you have admin or write access
    return this.http
      .post(
        `${environment.apiUri}/api/protected/cell/cell-info/for-experiment`,
        { searchStr: searchStr }
      )
      .pipe(retry(2), catchError(this.errorHandler));
  }

  getCells() {
    //return all the cell on which you have any type of access
    return this.http
      .get(`${environment.apiUri}/api/protected/cell/cell-info/`)
      .pipe(retry(2), catchError(this.errorHandler));
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
