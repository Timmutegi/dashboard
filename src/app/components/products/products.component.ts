import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = true;
  products: [];
  claims: [];
  agents: [];
  policyHolders: [];
  policies: [];
  partnerProducts: [];
  name: string;
  logo: string;
  brandColor: string;
  partnerID: string;

  constructor(private api: ApiService, private router: Router, private errorHandler: ErrorHandlingService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.api.get('PartnerAdmins/me').subscribe(
      res => {
        this.getPartnerProducts(res.partnerId);
        this.getAdminProfile(res.partnerId);
      },
      err => {
        // console.log(err);
        this.isLoading = false;
        this.errorHandler.handleError(err);
      }
    );
  }

  getAdminProfile(partnerID: string) {
    this.api.get(`Partners/${partnerID}`).subscribe(
      res => {
        this.name = res.name;
        this.logo = res.logo;
        this.brandColor = res.styles.color;
        localStorage.setItem('admin', JSON.stringify(res));
      },
      err => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getPartnerProducts(partnerID: string) {
    console.log(partnerID);
    this.api.get(`Partners/${partnerID}/partnerProducts`).subscribe(
      response => {
        console.log(response);
        this.products = response;
        this.getInfo(partnerID);
        this.isLoading = false;
      },
      err => {
        this.errorHandler.handleError(err);
      });
  }

  getInfo(partnerID: string) {
    this.api.get(`Partners/${partnerID}/agents/count`).subscribe((res) => {
      this.agents = res.count;
    });

    this.api.get(`Partners/${partnerID}/claims/count`).subscribe((res) => {
      this.claims = res.count;
    });

    this.api.get(`Partners/${partnerID}/policyHolders/count`).subscribe(
      res => {
        this.policyHolders = res.count;
    });

    this.api.get(`Partners/${partnerID}/policies/count`).subscribe(
      res => {
        this.policies = res.count;
    });

    this.api.get(`Partners/${partnerID}/partnerProducts/count`).subscribe((res) => {
      this.partnerProducts = res.count;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  dashboard(ID: string, description: string) {
    localStorage.setItem('partnerProductID', ID);
    localStorage.setItem('description', description);
    this.router.navigate(['/home/dashboard']);
  }
}
