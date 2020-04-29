import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  claims: [];
  policyHolders: [];
  agents: [];
  policies: [];
  monthly: [];
  annually: [];
  semiAnnually: [];
  commissions: [];
  partnerID = localStorage.getItem('partnerId');

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getClaims();
    this.getpolicyHolders();
    this.getAgents();
    this.getPolicies();
    this.getCommissions();
    this.getMonthly();
    this.getSemiAnnually();
    this.getAnnually();
  }

  getClaims() {
    this.api.get(`Partners/${this.partnerID}/claims/count`).subscribe(
      res => {
        this.claims = res.count;
      }
    );
  }

  getCommissions() {
    this.api.get(`Partners/${this.partnerID}/commissions/count`).subscribe(
      res => {
        this.commissions = res.count;
      }
    );
  }

  getpolicyHolders() {
    this.api.get(`Partners/${this.partnerID}/policyHolders/count`).subscribe(
      res => {
        this.policyHolders = res.count;
      }
    );
  }

  getAgents() {
    this.api.get(`Partners/${this.partnerID}/agents/count`).subscribe(
      res => {
        this.agents = res.count;
      }
    );
  }

  getPolicies() {
    this.api.get(`Partners/${this.partnerID}/policies/count`).subscribe(
      res => {
        this.policies = res.count;
      }
    );
  }

  getMonthly() {
    this.api.get('enrolments?filter={"where":{"paymentPlan.cycle":"MONTHLY"}}').subscribe(
      res => {
        this.monthly = res.length;
      }
    );
  }

  getAnnually() {
     this.api.get('enrolments?filter={"where":{"paymentPlan.cycle":"ANNUALLY"}}').subscribe(
      res => {
        this.annually = res.length;
      }
    );
  }

  getSemiAnnually() {
     this.api
       .get('enrolments?filter={"where":{"paymentPlan.cycle":"SEMI_ANUALLY"}}').subscribe(res => {
         this.semiAnnually = res.length;
       });

  }
}