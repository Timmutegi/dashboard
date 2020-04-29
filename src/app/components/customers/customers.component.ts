import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstname', 'lastname', 'phone', 'nationalID', 'createdAt', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getCustomers();
  }

  getCustomers() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/policyHolders`).subscribe(
      res => {
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
