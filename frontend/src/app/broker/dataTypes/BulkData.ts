export class BulkData {
  id: string;
  number: number;
  arrival: Date;
  departure: Date;
  actualNumber: number;
  cancelled: boolean;

  constructor(number: number, arrival: Date, departure: Date) {
    this.number = number;
    this.arrival = arrival;
    this.departure = departure;
  }

}
