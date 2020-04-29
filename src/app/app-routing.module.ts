import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ProductsComponent } from './components/products/products.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { EnrolmentsComponent } from './components/enrolments/enrolments.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'products/home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {
      path: 'dashboard',
      component: DashboardComponent,
      outlet: 'outlet1'
      },
      {
        path: 'policy-holders',
        component: CustomersComponent,
        outlet: 'outlet1'
      },
      {
        path: 'claims',
        component: ClaimsComponent,
        outlet: 'outlet1'
      },
      {
        path: 'agents',
        component: AgentsComponent,
        outlet: 'outlet1'
      },
      {
        path: 'commissions',
        component: CommissionsComponent,
        outlet: 'outlet1'
      },
      {
        path: 'enrolments',
        component: EnrolmentsComponent,
        outlet: 'outlet1'
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        outlet: 'outlet1'
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
