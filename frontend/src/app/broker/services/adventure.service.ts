import { Injectable } from '@angular/core';
import { AdventureData } from '../dataTypes/AdventureData';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  private apiUrl = '//localhost:8083/brokers';

  constructor(private http: HttpClient) { }

  getAdventures(code: string, nif: string): Observable<AdventureData[]> {
    const url = `${this.apiUrl}/${code}/clients/${nif}/adventures`;
    return this.http.get<AdventureData[]>(url).pipe(
      //log
      catchError(this.handleError<AdventureData[]>(`get adventures from broker with code ${code} and client with nif ${nif}`))
    );
  }

  addAdventure(code: string, nif: string, adventure: AdventureData) {
    const url = `${this.apiUrl}/${code}/clients/${nif}/adventures`;
    console.log(adventure);
    return this.http.post<AdventureData>(url, adventure, httpOptions).pipe(
      //tap((newClient: Client) => this.log(`added client w/ nif: ${newClient.nif}`)),
      catchError(this.handleError<AdventureData>('add adventure'))
    );
  }

  processAdventure(code: string, nif: string, adventureId: string) {
    const url = `${this.apiUrl}/${code}/clients/${nif}/adventures/${adventureId}/process`;
    return this.http.post<AdventureData>(url, null, httpOptions).pipe(
      //tap((newClient: Client) => this.log(`added client w/ nif: ${newClient.nif}`)),
      catchError(this.handleError<AdventureData>('process adventure'))
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
