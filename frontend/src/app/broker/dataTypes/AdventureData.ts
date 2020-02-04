export enum BookRoom {
    NONE = 0, SINGLE = 1, DOUBLE = 2
}

export enum RentVehicle {
    NONE = 0, CAR = 1, MOTORCYCLE = 2
}

export enum State {
    PROCESS_PAYMENT, RESERVE_ACTIVITY, BOOK_ROOM, RENT_VEHICLE, UNDO, CONFIRMED, CANCELLED, TAX_PAYMENT
}

export class AdventureData {
    
    id: string;
    // begin and end are in milliseconds
    begin: Date; 
    end: Date;
    age: number;
    iban: string; 
    margin: number; //margin is a number?
    bookRoom: BookRoom;
    rentVehicle: RentVehicle;
    amount: number;
    state: State;

    paymentConfirmation: string;
    paymentCancellation: string;
    roomConfirmation: string;
    roomCancellation: string;
    activityConfirmation: string;
    activityCancellation: string;

    // constructor as in Adventure.java
    // probably will need to change it
    constructor(begin: Date,
        end: Date,
        margin: number,
        bookRoom: BookRoom,
        rentVehicle: RentVehicle) {
            this.begin = begin;
            this.end = end;
            this.margin = margin;
            this.bookRoom = bookRoom;
            this.rentVehicle = rentVehicle;
        }
}


export interface AdventureItem {
    id: string;
    begin: Date; 
    end: Date;
    iban: string; 
    margin: number; 
    bookRoom: BookRoom;
    rentVehicle: RentVehicle;
    amount: number;
    state: State;
}

const EMPTY_BROKERDATA: AdventureItem[] = [];

export class AdventureDataSource {
    data = new Set<AdventureItem>();

    addData( id,  begin,  end,  iban,  margin,  bookRoom,  rentVehicle,  amount, state){
        this.data.add({"id":id, "begin":begin, "end":end, "iban":iban, "margin":margin,"bookRoom":bookRoom, "rentVehicle":rentVehicle, "amount":amount, "state":state });
    }

    newData(){
        this.data = new Set<AdventureItem>();
    }
}