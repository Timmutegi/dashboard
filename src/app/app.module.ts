import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatSidenavModule} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClaimsComponent } from './components/claims/claims.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnrolmentsComponent } from './components/enrolments/enrolments.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { FooterComponent } from './components/footer/footer.component';
import { PolicyholderschartComponent } from './components/policyholderschart/policyholderschart.component';
import { DatePipe } from '@angular/common';
import { UssdSessionsComponent } from './components/ussd-sessions/ussd-sessions.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { HttpErrorInterceptor } from './interceptor/httpconfig.interceptor';
import { GroupPoliciesComponent } from './group-policies/group-policies.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ClaimsComponent,
    NavbarComponent,
    AgentsComponent,
    ProductsComponent,
    LoginComponent,
    EnrolmentsComponent,
    CommissionsComponent,
    FooterComponent,
    PolicyholderschartComponent,
    UssdSessionsComponent,
    PoliciesComponent,
    GroupPoliciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DatePipe,
     {
     provide: HTTP_INTERCEPTORS,
     useClass: HttpErrorInterceptor,
     multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
