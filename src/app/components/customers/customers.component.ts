import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  isLoading = true;
  pipe: DatePipe;
  minDate: Date;
  maxDate: Date;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['serial', 'firstname', 'lastname', 'phone', 'nationalID', 'createdAt'];

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    let fromDate = this.filterForm.get('fromDate').value;
    fromDate = this.pipe.transform(fromDate, 'shortDate');
    return fromDate;
  }
  get toDate() {
    let toDate = this.filterForm.get('toDate').value;
    toDate = this.pipe.transform(toDate, 'shortDate');
    return toDate;
  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getCustomers();
    this.maxDate = new Date();
    this.minDate = new Date(2019, 0, 1);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.createdAt >= this.fromDate && data.createdAt <= this.toDate;
      }
      return true;
    };
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  getCustomers() {
    this.pipe = new DatePipe('en');
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/policyHolders`).subscribe(
      res => {
        res.forEach((element: { createdAt: string; }) => {
          element.createdAt = this.pipe.transform(element.createdAt, 'shortDate' );
        });
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
