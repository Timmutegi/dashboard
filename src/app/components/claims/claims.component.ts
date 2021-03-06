import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportType } from 'mat-table-exporter';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  exportType = ExportType.XLSX;
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  displayedColumns: string[] = ['index', 'status', 'processingHours', 'amount', 'benefit', 'createdAt'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
    this.getClaims();
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

  getClaims() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/claims`).subscribe(
      res => {
        res.forEach((element: { createdAt: string | number | Date; }) => {
          element.createdAt = new Date (element.createdAt);
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


