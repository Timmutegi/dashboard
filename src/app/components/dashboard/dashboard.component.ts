import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mode = 'push';
  opened: true;
  claims: [];
  policyHolders: [];
  agents: [];
  policies: [];
  monthly: [];
  annually: [];
  semiAnnually: [];
  commissions: [];
  ussdSessions: [];
  partnerID = localStorage.getItem('partnerProductID');

  constructor(private api: ApiService, public router: Router) { }

  ngOnInit() {
    this.getClaims();
    this.getpolicyHolders();
    this.getAgents();
    this.getPolicies();
    this.getCommissions();
    this.getUssd();
  }

  getClaims() {
    this.api.get(`PartnerProducts/${this.partnerID}/claims/count`).subscribe(
      res => {
        this.claims = res.count;
      }
    );
  }

  getCommissions() {
    this.api.get(`PartnerProducts/${this.partnerID}/commissions/count`).subscribe(
      res => {
        this.commissions = res.count;
      }
    );
  }

  getpolicyHolders() {
    this.api.get(`PartnerProducts/${this.partnerID}/policyHolders/count`).subscribe(
      res => {
        this.policyHolders = res.count;
      }
    );
  }

  getAgents() {
    this.api.get(`PartnerProducts/${this.partnerID}/agents/count`).subscribe(
      res => {
        this.agents = res.count;
      }
    );
  }

  getPolicies() {
    this.api.get(`PartnerProducts/${this.partnerID}/policies/count`).subscribe(
      res => {
        this.policies = res.count;
      }
    );
  }

  getUssd() {
    this.api.get(`PartnerProducts/${this.partnerID}/ussdSessions/count`).subscribe(
      res => {
        this.ussdSessions = res.count;
      }
    );
  }
}
