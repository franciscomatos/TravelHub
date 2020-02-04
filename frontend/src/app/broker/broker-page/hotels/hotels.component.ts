import { Component, OnInit } from '@angular/core';
import {BrokerData} from "../../dataTypes/brokerData";
import {ActivatedRoute} from "@angular/router";
import {BrokerService} from "../../services/broker.service";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  private brokerCode: string;
  private broker: BrokerData;
  private hotels: string[];
  private images = [1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(private router: ActivatedRoute, private service: BrokerService) {
    this.brokerCode = this.router.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.getBroker();
    this.getHotels();
  }

  getBroker(): void {
    this.service.getBroker(this.brokerCode).subscribe(broker => {this.broker = broker;});
  }

  getHotels(): void {
    this.service.getHotels(this.brokerCode).subscribe(hotels => {this.hotels = hotels.names;});
  }

}
