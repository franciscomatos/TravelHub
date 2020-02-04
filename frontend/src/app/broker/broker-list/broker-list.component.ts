import {  Component, OnInit, Input, ViewChild } from '@angular/core';
import { BrokerData, BrokerDataSource, BrokerItem } from '../dataTypes/brokerData';
import { BrokerService } from '../services/broker.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.css']//,
  //providers: [BrokerService]
})
export class BrokerListComponent implements OnInit {

  private brokers: BrokerData[];
  images = [1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);


  dataSource: MatTableDataSource<BrokerItem>;
  brokerDataSource = new BrokerDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  displayedColumns = ['code', 'name', 'clients'];
 
  constructor(private router: Router, private brokerService: BrokerService) { }
  
  ngOnInit() { 
    this.getBrokers();
    
    this.dataSource = new MatTableDataSource(Array.from(this.brokerDataSource.data));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getBrokers(): void {
    this.brokerService.getBrokers().subscribe(brokers => {
      this.brokers = brokers; 
      brokers.forEach( broker => {
        console.log(this.brokerDataSource) 
        this.brokerDataSource.addData(broker.code,broker.name,broker.nif,broker.iban); 
      }); 
    });
  }

  createBroker(code: string, name: string, nif: string, iban: string): void {
    let broker = new BrokerData(code, name, nif, iban);
    // not sure about this.getBrokers after
    this.brokerService.createBroker(broker).subscribe(broker => this.getBrokers());
    this.brokerDataSource.addData(code,name,nif,iban);
  }

  deleteBroker(broker: BrokerData): void {
    this.brokerService.deleteBroker(broker.code);
    this.brokers.filter(b => b === broker);
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

