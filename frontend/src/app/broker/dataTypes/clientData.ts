export class ClientData {
    brokerCode: string;
    nif: string;
    iban: string;
    passwd: string;
    email: string;
    age: number;
    drivingLicense: string;

    constructor(brokerCode: string, nif: string, iban: string, age: number, drivingLicense: string, email: string, passwd: string) {
        this.brokerCode = brokerCode;
        this.passwd = passwd;
        this.email = email;
        this.nif = nif;
        this.iban = iban;
        this.age = age;
        this.drivingLicense = drivingLicense;
    }
}