import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {ReferenceData} from "../dataTypes/ReferenceData";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  private apiUrl = '//localhost:8083/brokers';

  constructor(private http: HttpClient) { }

  getReferences(code: string, id: string):Observable<ReferenceData[]> {
    const url = `${this.apiUrl}/${code}/bulks/${id}/references`;
    return this.http.get<ReferenceData[]>(url).pipe(
      // log
      catchError(this.handleError<ReferenceData[]>(`get references from bulk with id ${id}`))
    );
  }

  cancelBooking(code: string, id: string, refId: string) {
    const url = `${this.apiUrl}/${code}/bulks/${id}/references/${refId}/cancel`;
    return this.http.post<ReferenceData>(url, null, httpOptions).pipe(
      // log
      catchError(this.handleError<ReferenceData>(`cancel booking with reference ${refId}`))
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
