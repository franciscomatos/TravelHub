import {Component, OnInit, ViewChild} from '@angular/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import {
  DateAdapter,
  ErrorStateMatcher,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatPaginator, MatSort,
  MatTableDataSource
} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {AdventureData, AdventureDataSource, AdventureItem, BookRoom, RentVehicle} from "../../dataTypes/AdventureData";
import {ActivatedRoute} from "@angular/router";
import {AdventureService} from "../../services/adventure.service";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM-DD',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM-DD',
  },
};

export class DatesInOrderStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('dateBegin').value.diff(control.parent.get('dateEnd')) >= 0 && control.dirty)
  }
}
export function DatesInOrderValidator(group: FormGroup) {
  let end = group.controls.dateEnd.value.toDate();
  let begin = group.controls.dateBegin.value.toDate();
  return begin <= end ? null : { datesNotInOrder: true }
}


@Component({
  selector: 'app-list-adventures',
  templateUrl: './list-adventures.component.html',
  styleUrls: ['./list-adventures.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ListAdventuresComponent implements OnInit {

  private brokerCode: string;
  private clientNif: string;
  private adventureForm: FormGroup
  private adventures: AdventureData[];

  private roomOptions: string[];
  private roomOption: BookRoom = BookRoom.NONE;
  BookRoom : typeof BookRoom = BookRoom;

  private vehicleOptions: string[];
  private vehicleOption: RentVehicle = RentVehicle.NONE;
  RentVehicle : typeof RentVehicle = RentVehicle;

  dataSource: MatTableDataSource<AdventureItem>;
  adventureDataSource = new AdventureDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns = ["id", "begin", "end", "rentVehicle", "bookRoom", "amount", "state","process"];


  constructor(
    private route: ActivatedRoute,
    private service: AdventureService,
    private _formBuilder: FormBuilder
  ) {
    var roomOptions = Object.keys(BookRoom)
    var vehicleOptions = Object.keys(RentVehicle);

    this.brokerCode= this.route.snapshot.paramMap.get('code');
    this.clientNif = this.route.snapshot.paramMap.get('nif');
    this.roomOptions = roomOptions.slice(roomOptions.length/2);
    this.vehicleOptions = vehicleOptions.slice(roomOptions.length/2);
  }

  ngOnInit() {
    this.getAdventures();
    this.adventureForm = this._formBuilder.group({
        dateBegin: new FormControl(_moment(), Validators.required),
        dateEnd: new FormControl(_moment(), Validators.required),
        vehicle: ['', Validators.required],
        room: ['', Validators.required]
      }, {validator: DatesInOrderValidator}
    );
  }

  getAdventures(): void {
    this.adventureDataSource.newData()
    this.service.getAdventures(this.brokerCode, this.clientNif).subscribe(adventures => {adventures.forEach(adventure => {
      this.adventureDataSource.addData(adventure.id, adventure.begin, adventure.end, adventure.iban, adventure.margin,adventure.bookRoom, adventure.rentVehicle, adventure.amount, adventure.state ); 

      });
      this.dataSource = new MatTableDataSource(Array.from(this.adventureDataSource.data));
      this.adventures = adventures;
      this.dataSource.sort = this.sort;
    });
  }


  processAdventure(adventureId: string): void {
    this.service.processAdventure(this.brokerCode, this.clientNif, adventureId).subscribe(_ => this.getAdventures());
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  compareDates(d1: Date, d2: Date): boolean {
    return d1.getDay() == d2.getDay() && d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth();

  }
}
