import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginData } from '../dataTypes/loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  brokerCode : string;
  username: string;
  password: string;
  status: number;
  showErrorMessage: boolean;

  constructor(private router:Router, private actRouter: ActivatedRoute,private loginService: LoginService) { 
    this.brokerCode = this.actRouter.snapshot.paramMap.get('code');
  }
  
  
  ngOnInit() {
    this.showErrorMessage = false;
  }
  
  login() : void {
    /*ONLY continue if the username exists*/
    console.log(this.username, this.password);
    let login = new LoginData(this.username, this.password);
    
    this.loginService.authenticate(login, this.brokerCode).subscribe(
        nif => {
          this.router.navigateByUrl('/brokers/'+this.brokerCode+'/clients/'+nif+'/adventures');
        },
        err => {
          if(err.status === 403){
            // error
            console.log(err.error);
            this.showErrorMessage = true;
          }
        }
      );
    
    // this.router.navigateByUrl('/brokers/'+this.brokerCode+'/clients/'+this.username+'/adventures');
  }
  register() : void {
    this.router.navigateByUrl('/brokers/'+this.brokerCode+'/register');
  }
  
}
  
