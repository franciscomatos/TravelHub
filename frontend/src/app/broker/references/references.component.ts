import { Component, OnInit } from '@angular/core';
import { ReferenceData } from "../dataTypes/ReferenceData";
import { ReferenceService } from '../services/reference.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {

  private references: ReferenceData[];
  private brokerCode: string;
  private bulkId: string;


  constructor(private route: ActivatedRoute,
              private service: ReferenceService) {
    this.brokerCode= this.route.snapshot.paramMap.get('code');
    this.bulkId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getReferences();
  }

  getReferences(): void {
    this.service.getReferences(this.brokerCode, this.bulkId).subscribe(references => {this.references = references});
  }

  cancelBooking(id: string): void {
    this.service.cancelBooking(this.brokerCode, this.bulkId, id).subscribe(reference => this.getReferences());
  }


}
