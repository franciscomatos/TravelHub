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
import {ActivitiesNameData} from "../dataTypes/ActivitiesNameData";
import {HotelsNamesData} from "../dataTypes/HotelsNamesData";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private apiUrl = '//localhost:8083/brokers';

  constructor(private http: HttpClient) {}

  getBrokers(): Observable<BrokerData[]> {
    return this.http.get<BrokerData[]>(this.apiUrl).pipe(
      catchError(this.handleError<BrokerData[]>('getBrokers', []))
    );
  }

  createBroker(broker: BrokerData) {
    return this.http.post<BrokerData>(this.apiUrl, broker, httpOptions).pipe(
      //tap((newBroker: Broker) => this.log(`added broker w/ code: ${newBroker.code}`)),
      catchError(this.handleError<BrokerData>('add broker'))
    );
  }

  deleteBroker(broker: BrokerData | string ): Observable<BrokerData> {
    const code = typeof broker === 'string' ? broker : broker.code;
    const url = `${this.apiUrl}/${code}`;

    return this.http.delete<BrokerData>(url, httpOptions).pipe(
      //tap((newBroker: Broker) => this.log(`added broker w/ code: ${newBroker.code}`)),
      catchError(this.handleError<BrokerData>('delete broker'))
    );
  }


  getBroker(code: string): Observable<BrokerData> {
    const url = `${this.apiUrl}/${code}`;
    return this.http.get<BrokerData>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<BrokerData>(`getBroker code=${code}`))
    );
  }

  getActivities(code: string): Observable<ActivitiesNameData> {
    const url = `${this.apiUrl}/${code}/activities`;
    return this.http.get<ActivitiesNameData>(url).pipe(
      //log
      catchError(this.handleError<ActivitiesNameData>('getActivities'))
    );
  }

  getHotels(code: string): Observable<HotelsNamesData> {
    const url = `${this.apiUrl}/${code}/hotels`;
    return this.http.get<HotelsNamesData>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HotelsNamesData>('getHotels'))
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
