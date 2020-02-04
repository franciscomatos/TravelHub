import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerListComponent } from './broker-list/broker-list.component';

const routes: Routes = [
  {path: 'api/brokers', component: BrokerListComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class BrokerRoutingModule { }
