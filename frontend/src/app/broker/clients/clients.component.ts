import { Component, OnInit } from '@angular/core';
import { ClientData } from '../dataTypes/clientData';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private clients: ClientData[];
  private brokerCode: string;

  constructor(
    private route: ActivatedRoute,
    private service: ClientService
    ) { 
      this.brokerCode= this.route.snapshot.paramMap.get('code');
    }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.service.getClients(this.brokerCode).subscribe(clients => (this.clients = clients));
  }

  addClient(nif: string, iban: string, age: number, drivingLicense: string, email: string, passwd: string) {
    let client = new ClientData(this.brokerCode, nif, iban, age, drivingLicense, email, passwd);
    // not sure about this.getClients after
    this.service.addClient(client).subscribe(client => this.getClients());
  }

}
