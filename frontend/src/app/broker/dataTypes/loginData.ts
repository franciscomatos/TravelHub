export class LoginData {
    email: string;
    passwd: string;

    constructor(email: string, passwd: string) {
        this.passwd = passwd;
        this.email = email;
    }
}