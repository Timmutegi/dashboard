import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-ussd-sessions',
  templateUrl: './ussd-sessions.component.html',
  styleUrls: ['./ussd-sessions.component.scss']
})
export class UssdSessionsComponent implements OnInit {
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['serial', 'phone', 'code', 'text', 'createdAt'];

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    const fromDate = new Date(this.filterForm.get('fromDate').value);
    return fromDate;
  }
  get toDate() {
    const toDate = new Date(this.filterForm.get('toDate').value);
    toDate.setDate(toDate.getDate() + 1);
    return toDate;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getSessions();
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

  getSessions() {
    const ID = localStorage.getItem('partnerProductID');

    this.api.get(`PartnerProducts/${ID}/ussdSessions`).subscribe(
      res => {
        console.log(res);
        res.forEach((element: { createdAt: string | number | Date; }) => {
          element.createdAt = new Date(element.createdAt);
        });
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );

  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

}
