import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'phone', 'email', 'code', 'amount', 'paid', 'date'];

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
    this.getCommissions();
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

  getCommissions() {
    const ID = localStorage.getItem('partnerProductID');
    this.api
      .get(`PartnerProducts/${ID}/commissions?filter[include]=agent`)
      .subscribe((res) => {
        res.forEach((element: { createdAt: string | number | Date }) => {
          element.createdAt = new Date(element.createdAt);
        });
        this.isLoading = false;
        this.dataSource.data = res;
      });
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

}
