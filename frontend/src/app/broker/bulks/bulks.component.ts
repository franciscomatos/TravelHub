import { Component, OnInit } from '@angular/core';
import { BulkService } from '../services/bulk.service';
import { ActivatedRoute } from '@angular/router';
import { BulkData } from '../dataTypes/BulkData';

@Component({
  selector: 'app-bulks',
  templateUrl: './bulks.component.html',
  styleUrls: ['./bulks.component.css']
})
export class BulksComponent implements OnInit {

  private brokerCode: string;
  bulks: BulkData[];

  constructor(private route: ActivatedRoute, private service: BulkService) {
    this.brokerCode= this.route.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    this.getBulks();
  }

  getBulks(): void {
    this.service.getBulks(this.brokerCode).subscribe(bulks => {this.bulks = bulks});
  }

  addBulk(number: number, begin: Date, end: Date): void {
    let bulk = new BulkData(+number, begin, end);
    this.service.addBulk(this.brokerCode, bulk).subscribe(bulk => this.getBulks());
  }

  processBulk(id: string): void {
    this.service.processBulk(this.brokerCode, id).subscribe(bulk => this.getBulks());
  }
}
