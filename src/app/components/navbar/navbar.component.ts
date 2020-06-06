import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  status: string;
  brandColor: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('token');
    this.brandColor = JSON.parse(localStorage.getItem('admin')).styles.color;
    console.log(this.brandColor);
  }

  clickMenu() {
    const navs = document.querySelectorAll('.Navbar-Items');

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
