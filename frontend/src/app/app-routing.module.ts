import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerListComponent } from './broker/broker-list/broker-list.component';
import { ClientsComponent } from './broker/clients/clients.component';
import { AdventuresComponent } from './broker/adventures/adventures.component';
import { BulksComponent } from "./broker/bulks/bulks.component";
import { ReferencesComponent } from "./broker/references/references.component";
import { TopBrokersComponent } from "./broker/top-brokers/top-brokers.component";
import { AllBrokersComponent } from "./broker/all-brokers/all-brokers.component";
import { LoginComponent } from './broker/login/login.component';
import { RegisterComponent } from './broker/register/register.component';
import { BrokerPageComponent } from "./broker/broker-page/broker-page.component";
import { HotelsComponent } from "./broker/broker-page/hotels/hotels.component";
import { ActivitiesComponent } from "./broker/broker-page/activities/activities.component";
import { ListAdventuresComponent } from "./broker/adventures/list-adventures/list-adventures.component";

const routes: Routes = [
  {path: 'brokers/:code/bulks/:id/references', component: ReferencesComponent},
  {path: 'brokers/:code/bulks', component: BulksComponent},
  {path: 'brokers/:code/clients/:nif/adventures/list', component: ListAdventuresComponent},
  {path: 'brokers/:code/clients/:nif/adventures', component: AdventuresComponent},
  {path: 'brokers/:code/login', component: LoginComponent},
  {path: 'brokers/:code/register', component: RegisterComponent},
  {path: 'brokers/:code/clients', component: ClientsComponent},
  {path: 'brokers/:code/activities', component: ActivitiesComponent},
  {path: 'brokers/:code/hotels', component: HotelsComponent},
  {path: 'brokers/:code/main', component: BrokerPageComponent},
  {path: 'brokers/allBrokers', component: AllBrokersComponent},
  {path: 'brokers/topBrokers', component: TopBrokersComponent},
  {path: 'brokers', component: BrokerListComponent},
  {path: '', redirectTo: '/brokers', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
