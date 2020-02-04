import { Component, OnInit, Directive, Input } from '@angular/core';
import { ClientData } from '../dataTypes/clientData';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl, Validator, NG_VALIDATORS, FormGroupDirective, NgForm, FormArray} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import {BrokerService} from "../services/broker.service";
import {BrokerData} from "../dataTypes/brokerData";


export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('passwordFormControl').value !== control.parent.get('confirmPasswordFormControl').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  let password = group.controls.passwordFormControl.value;
  let passwordConfirmation = group.controls.confirmPasswordFormControl.value;
  return password === passwordConfirmation ? null : { passwordsNotEqual: true }     
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private clients: ClientData[];
  private brokerCode: string;
  private brokerName: string;
  isLinear = true;
  // registrationForm: FormGroup;
  formGroup: FormGroup;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  detailsFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }
  
  constructor(
    private actRoute: ActivatedRoute,
    private service: ClientService,
    private router:Router,
    private _formBuilder: FormBuilder,
    private brokerService: BrokerService
    ) { 
      this.brokerCode= this.actRoute.snapshot.paramMap.get('code');
    }

  ngOnInit() {
    this.getBroker();
    this.getClients();
    this.formGroup = new FormGroup({
      formArray: new FormArray([
        this._formBuilder.group({
          emailFormControl: new FormControl('', EmailValidation),
          passwordFormControl: new FormControl('', PasswordValidation),
          confirmPasswordFormControl: new FormControl('')
          }, {validator: RepeatPasswordValidator}
        ),
        this._formBuilder.group({
          nifFormCtrl: ['', Validators.required],
          ibanFormCtrl: ['', Validators.required],
          ageFormCtrl: ['', Validators.required],
          drivingLicenseFormCtrl: ['', Validators.required]
        }),
      ])
    });

  }
    // this.registrationForm = new FormGroup( {
    //   'authenticationDetails': new FormGroup({
    //     'email': new FormControl(null, Validators.required),
    //     'password': new FormControl(null, Validators.required),
    //     'confirmPassword': new FormControl(null, Validators.required)
    //   }),
    //   'personalInformation': new FormGroup({
    //     'nif': new FormControl(null, Validators.required),
    //     'iban': new FormControl(null, Validators.required),
    //     'age': new FormControl(null, Validators.required),
    //     'drivingLicense': new FormControl(),
    //   })

    // })

    // this.formGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

  getBroker(): void {
    this.brokerService.getBroker(this.brokerCode).subscribe(broker => {this.brokerName = broker.name;});
  }

  getClients(): void {
    this.service.getClients(this.brokerCode).subscribe(clients => (this.clients = clients));
  }

  addClient(nif: string, iban: string, age: number, drivingLicense: string, email: string, passwd: string) {
    let client = new ClientData(this.brokerCode, nif, iban, age, drivingLicense, email, passwd);
    /*Should only redirect the page if its a valid register */
    this.service.addClient(client);
    this.service.addClient(client).subscribe(client => {
      this.getClients();
      this.router.navigateByUrl('/brokers/'+this.brokerCode+'/clients/'+nif+'/adventures');
    });
    
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    
    return pass === confirmPass ? null : { notSame: true }    
  }

  getConfirmPassErrorMsg(): string {
    console.log(this.formGroup.hasError('passwordsNotEqual'))
    return this.formGroup.hasError('passwordsNotEqual') ? 'Passwords must match' : '';
  }
  
  getPasswordErrorMsg(): string {
      if(this.formGroup.controls.passwordFormControl.hasError('required')){
        return "Password is required!"
      } else {
        if(this.formGroup.controls.passwordFormControl.hasError('minlength')) {
          return "Password must be longer than 6 characters!"
        }
        else if(this.formGroup.controls.passwordFormControl.hasError('minlength')){
          return "Password must be shorter than 24 characters!"
        } 
      }
    }

  getEmailErrorMsg(): string {
    console.log("HERE2");
    if(this.formGroup.controls.emailFormControl.hasError('required')){
      return "Email is required!";
    } else if(this.formGroup.controls.emailFormControl.hasError('email')){
      return "Invalid email format";
      }
  }
}
