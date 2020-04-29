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
  ID: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUser();
  }

  getUser() {
    this.api.get('PartnerAdmins/me').subscribe(
      res => {
        this.api.get(`Partners/${res.partnerId}/partnerProducts`).subscribe(
          response => {
          console.log(response);
          this.products = response;
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

  dashboard(ID: string, description: string) {
    localStorage.setItem('partnerProductID', ID);
    console.log(ID, description);
    this.router.navigate(['/products/home']);
  }

}
