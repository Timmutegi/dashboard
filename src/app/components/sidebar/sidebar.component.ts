import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  logo: string;
  brandColor: string;

  constructor() { }

  ngOnInit() {
    this.logo = JSON.parse(localStorage.getItem('admin')).logo;
    this.brandColor = JSON.parse(localStorage.getItem('admin')).styles.color;
  }

}
