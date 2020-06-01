import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  isLoading = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'phone', 'nationalID', 'email', 'code', 'createdAt', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAgents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAgents() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`Partnerproducts/${ID}/agents`).subscribe(
      res => {
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

}
