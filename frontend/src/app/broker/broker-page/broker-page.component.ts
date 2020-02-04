import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BrokerService} from "../services/broker.service";
import {BrokerData} from "../dataTypes/brokerData";

@Component({
  selector: 'app-broker-page',
  templateUrl: './broker-page.component.html',
  styleUrls: ['./broker-page.component.css']
})
export class BrokerPageComponent implements OnInit {

  private brokerCode: string;
  private broker: BrokerData;

  constructor(private route: ActivatedRoute, private service: BrokerService) {
    this.brokerCode= this.route.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.getBroker();
  }

  getBroker(): void {
    this.service.getBroker(this.brokerCode).subscribe(broker => {this.broker = broker;});
  }

}
