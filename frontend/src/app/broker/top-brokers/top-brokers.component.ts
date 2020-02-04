import { Component, OnInit } from '@angular/core';
import { BrokerData } from '../dataTypes/brokerData';
import { BrokerService } from '../services/broker.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-brokers',
  templateUrl: './top-brokers.component.html',
  styleUrls: ['./top-brokers.component.css']
})
export class TopBrokersComponent implements OnInit {

  private brokers: BrokerData[];

  constructor(private router: Router, private brokerService: BrokerService) { }

  ngOnInit() {
    this.getBrokers();
  }

  getBrokers(): void {
    this.brokerService.getBrokers().subscribe(brokers => {this.brokers = brokers;});
  }

}
