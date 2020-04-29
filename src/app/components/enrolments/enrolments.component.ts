import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-enrolments',
  templateUrl: './enrolments.component.html',
  styleUrls: ['./enrolments.component.scss']
})
export class EnrolmentsComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstname', 'lastname', 'nationalID', 'phone', 'date', 'amount', 'cycle', 'payments'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getEnrolments();
  }

  getEnrolments() {
    this.api.get('Enrolments?filter={"include":"policyHolder"}').subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
    // const ID = localStorage.getItem('partnerProductID');
    // this.api.get(`PartnerProducts/${ID}/policies`).subscribe(
    //   res => {
    //     console.log(res);
    //     this.isLoading = false;
    //     this.dataSource.data = res;
    //   }
    // );
  }

}
