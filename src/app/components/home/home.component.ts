import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mode = 'push';
  opened: true;

  constructor(public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    // this.ID = this.activatedRoute.snapshot.params.ID;
  }

}
