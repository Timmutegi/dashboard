import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  isLoading = true;
  displayedColumns: string[] = ['name', 'phone', 'status', 'policy', 'beneficiaryName', 'beneficiaryPhone', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
