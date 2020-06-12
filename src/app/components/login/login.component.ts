import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private errorHandler: ErrorHandlingService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.api.login('PartnerAdmins/login', this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.id);
        localStorage.setItem('ttl', res.ttl);
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.errorHandler.handleError(err);
      }
    );
  }
}
