import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { BrokerRoutingModule } from './broker-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { BulksComponent } from './bulks/bulks.component';
import { ReferencesComponent } from './references/references.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule, MatDatepickerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDividerModule, MatListModule, MatCardModule, MatProgressSpinnerModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatMenuModule, MatStepperModule, MatAutocompleteModule, MatGridListModule, MatSelectModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TopBrokersComponent } from './top-brokers/top-brokers.component';
import { AllBrokersComponent } from './all-brokers/all-brokers.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { BrokerPageComponent } from './broker-page/broker-page.component';
import { HotelsComponent } from './broker-page/hotels/hotels.component';
import { ActivitiesComponent } from './broker-page/activities/activities.component';
import { ListAdventuresComponent } from './adventures/list-adventures/list-adventures.component';

@NgModule({
  declarations: [BrokerListComponent, ClientsComponent, AdventuresComponent, BulksComponent, ReferencesComponent, TopBrokersComponent, AllBrokersComponent, LoginComponent, RegisterComponent, BrokerPageComponent, HotelsComponent, ActivitiesComponent, ListAdventuresComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrokerRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule, 
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule, 
    MatStepperModule,
    MatAutocompleteModule,        
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSelectModule,
  ],
  providers: [  
    MatDatepickerModule,  
    MomentDateAdapter
  ]
})
export class BrokerModule { }
