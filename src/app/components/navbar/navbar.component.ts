import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  status: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('token');
  }

  clickMenu() {
    const navs = document.querySelectorAll('.Navbar-Items');

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ttl');
    localStorage.removeItem('partnerId');
    localStorage.removeItem('partnerProductID');
    this.router.navigate(['/']);
  }

}
