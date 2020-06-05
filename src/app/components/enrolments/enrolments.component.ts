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
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'phone', 'nationalID', 'date', 'amount', 'cycle', 'payments'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getEnrolments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

  getEnrolments() {
    this.api.get('Enrolments?filter={"include":"policyHolder"}').subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
