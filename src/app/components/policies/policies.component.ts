import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

export interface Data {
  startDate: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  individuals: any = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'serial',
    'firstname',
    'lastname',
    'phone',
    'startDate',
    'expiryDate',
    'paid',
    'price',
    'nextPaymentDate',
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
        return data.startDate >= this.fromDate && data.startDate <= this.toDate;
      }
      return true;
    };
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  getPolicies() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/policies?filter[include]=policyHolder&filter[include][group]=members`)
    .subscribe((res) => {
      res.forEach((element: { startDate: string | number | Date; policyHolderId: any; }) => {
        element.startDate = new Date(element.startDate);
        if (element.policyHolderId != null) {
          this.individuals.push(element);
        }
      });
      this.isLoading = false;
      this.dataSource.data = this.individuals;
    });
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

}
