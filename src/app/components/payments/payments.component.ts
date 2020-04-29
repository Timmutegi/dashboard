import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['fullname', 'phone', 'amount', 'type', 'ref', 'date'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getPayments();
  }

  getPayments() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/payments`).subscribe(
      res => {
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
