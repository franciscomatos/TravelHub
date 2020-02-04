import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BrokerService} from "../../services/broker.service";
import {BrokerData} from "../../dataTypes/brokerData";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  private brokerCode: string;
  private broker: BrokerData;
  private activities: string[];
  private images = [1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);


  constructor(private router: ActivatedRoute, private service: BrokerService) {
    this.brokerCode = this.router.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.getBroker();
    this.getActivities();
  }

  getBroker(): void {
    this.service.getBroker(this.brokerCode).subscribe(broker => {this.broker = broker;});
  }

  getActivities(): void {
    this.service.getActivities(this.brokerCode).subscribe(activities => {this.activities = activities.names;});
  }

}
