import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['index', 'agent', 'amount', 'paid', 'date'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getCommissions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCommissions() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/commissions`).subscribe(
      res => {
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
