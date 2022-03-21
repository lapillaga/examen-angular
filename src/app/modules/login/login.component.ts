import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;
  inputType = 'password';
  visible = false;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['lpillaga@pichincha.com', Validators.required],
      password: ['La$$$Password34', [Validators.required, Validators.min(6)]]
    });
  }

  login() {
    if (this.form?.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.form?.value)
      .subscribe({
        next: (res: LoginResponse) => {
          if (res.status === 'success') {
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/home']);
          }
          this.snackbar.open(res.message, 'OK', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.snackbar.open(error.message, 'OK', {
            duration: 2000
          });
          this.loading = false;
        }
      })
  }
}
