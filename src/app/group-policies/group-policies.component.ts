import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';
import { ExportType } from 'mat-table-exporter';

export interface Data {
  startDate: Date;
  groupId: string;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-group-policies',
  templateUrl: './group-policies.component.html',
  styleUrls: ['./group-policies.component.scss']
})
export class GroupPoliciesComponent implements OnInit {
  exportType = ExportType.XLSX;
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  groups: any = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'serial',
    'firstname',
    'lastname',
    'phone',
    'count',
    'type',
    'startDate',
    'paid',
    'price',
    'nextPaymentAmount'
  ];

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
    this.getPolicies();
    this.maxDate = new Date();
    this.minDate = new Date(2019, 0, 1);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return (
          data.startDate >= this.fromDate && data.startDate <= this.toDate
        );
      }
      return true;
    };
  }

  getPolicies() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/policies?filter[include]=policyHolder&filter[include][group]=members`)
    .subscribe((res) => {
      res.forEach((element) => {
        element.startDate = new Date(element.startDate);
        if (element.policyHolderId == null) {
          console.log(element);
          this.groups.push(element);
        }
      });
      // console.log(res);
      this.isLoading = false;
      this.dataSource.data = this.groups;
    });
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }
}
