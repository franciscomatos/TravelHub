import { Injectable } from '@angular/core';
import { BrokerData } from '../dataTypes/brokerData';
import { ClientData } from '../dataTypes/clientData';
import { AdventureData } from '../dataTypes/AdventureData';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import {BulkData} from "../dataTypes/BulkData";
import {ReferenceData} from "../dataTypes/ReferenceData";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BulkService {

  private apiUrl = '//localhost:8083/brokers';

  constructor(private http: HttpClient) { }

  getBulks(code: string): Observable<BulkData[]> {
    const url = `${this.apiUrl}/${code}/bulks`;
    return this.http.get<BulkData[]>(url).pipe(
      // log
      catchError(this.handleError<BulkData[]>(`get bulks from broker with code ${code}`))
    );
  }

  addBulk(code: string, bulk: BulkData) {
    const url = `${this.apiUrl}/${code}/bulks`;
    return this.http.post<BulkData>(url, bulk, httpOptions).pipe(
      //log
      catchError(this.handleError<BulkData>('add bulk'))
    );
  }

  processBulk(code: string, id: string) {
    const url = `${this.apiUrl}/${code}/bulks/${id}/process`;
    return this.http.post<BulkData>(url, null, httpOptions).pipe(
      // log
      catchError(this.handleError<BulkData>(`process bulk with id ${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
