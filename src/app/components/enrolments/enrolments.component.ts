import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportType } from 'mat-table-exporter';

export interface Data {
  enrolmentDate: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-enrolments',
  templateUrl: './enrolments.component.html',
  styleUrls: ['./enrolments.component.scss']
})
export class EnrolmentsComponent implements OnInit {
  exportType = ExportType.XLSX;
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'phone', 'nationalID', 'date', 'amount', 'cycle', 'payments'];

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
    this.getEnrolments();
    this.maxDate = new Date();
    this.minDate = new Date(2019, 0, 1);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.enrolmentDate >= this.fromDate && data.enrolmentDate <= this.toDate;
      }
      return true;
    };
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  getEnrolments() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`Enrolments?filter={"where":{"partnerProductId": "${ID}"}, "include": "policyHolder"}`).subscribe(
      res => {
        res.forEach((element: { enrolmentDate: string | number | Date; }) => {
          element.enrolmentDate = new Date(element.enrolmentDate);
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
