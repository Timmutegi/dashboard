import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'phone', 'status', 'policy', 'beneficiaryName', 'beneficiaryPhone', 'createdAt', 'actions'];
  products: [];
  partnerID: string;
  claims: [];
  agents: [];
  policyHolders: [];
  policies: [];
  partnerProducts: [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUser();
  }

  getUser() {
    this.api.get('PartnerAdmins/me').subscribe(
      res => {
        this.partnerID = res.partnerId;
        this.api.get(`Partners/${res.partnerId}/partnerProducts`).subscribe(
          response => {
          this.products = response;
          this.getInfo();
          this.isLoading = false;
        },
        err => {
          alert(err);
        });
      },
      err => {
        alert(err);
      }
    );
  }

  getInfo() {
    this.api.get(`Partners/${this.partnerID}/agents/count`).subscribe((res) => {
      this.agents = res.count;
    });

    this.api.get(`Partners/${this.partnerID}/claims/count`).subscribe((res) => {
      this.claims = res.count;
    });

    this.api.get(`Partners/${this.partnerID}/policyHolders/count`).subscribe(
      res => {
        this.policyHolders = res.count;
    });

    this.api.get(`Partners/${this.partnerID}/policies/count`).subscribe(
      res => {
        this.policies = res.count;
    });

    this.api.get(`Partners/${this.partnerID}/partnerProducts/count`).subscribe((res) => {
      this.partnerProducts = res.count;
    });
  }

  dashboard(ID: string, description: string) {
    localStorage.setItem('partnerProductID', ID);
    this.router.navigate(['/products/home']);
  }
}
