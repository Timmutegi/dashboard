import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ProductsComponent } from './components/products/products.component';
import { EnrolmentsComponent } from './components/enrolments/enrolments.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { UssdSessionsComponent } from './components/ussd-sessions/ussd-sessions.component';
import { PoliciesComponent } from './components/policies/policies.component';


const routes: Routes = [
  { path: 'home', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'home/dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
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
        path: 'policies',
        component: PoliciesComponent,
        outlet: 'outlet1'
      },
      {
        path: 'ussd-sessions',
        component: UssdSessionsComponent,
        outlet: 'outlet1'
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
