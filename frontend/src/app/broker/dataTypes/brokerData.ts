import { ClientData } from './clientData';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { BrokerService } from '../services/broker.service';
import { query } from '@angular/animations';
import { filter } from 'minimatch';

export class BrokerData {
    code: string;
    name: string;
    nif: string;
    iban: string;
    // probably there's no need
    clients: ClientData[];

    constructor(code: string, name: string, nif: string, iban: string) {
        this.code = code;
        this.name = name;
        this.nif = nif;
        this.iban = iban;
        this.clients = [];
    }

    addClient(client: ClientData) {
        this.clients.push(client);
    }
}

export interface BrokerItem {
    code: string;
    name: string;
    nif: string;
    iban: string;
}

const EMPTY_BROKERDATA: BrokerItem[] = [];

export class BrokerDataSource {
    data = new Set<BrokerItem>();

    addData( code,  name,  nif,  iban){
        this.data.add({"code":code, "name":name, "nif":nif, "iban":iban });
    }
}
  
