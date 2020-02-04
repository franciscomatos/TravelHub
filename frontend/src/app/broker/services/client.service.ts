import { Injectable } from '@angular/core';
import { ClientData } from '../dataTypes/clientData';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = '//localhost:8083/brokers';

  constructor(private http: HttpClient) { }

  getClients(code: string): Observable<ClientData[]> {
    const url = `${this.apiUrl}/${code}/clients`;
    return this.http.get<ClientData[]>(url).pipe(
      // log
      catchError(this.handleError<ClientData[]>(`get clients from broker with code ${code}`))
    );
  }

  addClient(client: ClientData) {
    const url = `${this.apiUrl}/${client.brokerCode}/clients`;
    return this.http.post<ClientData>(url, client, httpOptions).pipe(
      //tap((newClient: Client) => this.log(`added client w/ nif: ${newClient.nif}`)),
      catchError(this.handleError<ClientData>('add client'))
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
