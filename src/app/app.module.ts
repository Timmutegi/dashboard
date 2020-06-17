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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersComponent } from './components/customers/customers.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ProductsComponent } from './components/products/products.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnrolmentsComponent } from './components/enrolments/enrolments.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    CustomersComponent,
    ClaimsComponent,
    NavbarComponent,
    AgentsComponent,
    ProductsComponent,
    ChannelsComponent,
    PaymentsComponent,
    MessagesComponent,
    LoginComponent,
    EnrolmentsComponent,
    CommissionsComponent,
    FooterComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
