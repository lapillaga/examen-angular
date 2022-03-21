import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/model/user';
import { RolService } from 'src/app/shared/services/rol.service';
import { Rol } from 'src/app/model/rol';
import { ConfirmedValidator } from 'src/app/shared/validators/password-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {
  UniqueIdentificacionValidator
} from 'src/app/shared/directives/unique-identificacion/unique-identificacion.directive';
import { UniqueUsernameValidator } from 'src/app/shared/directives/unique-username/unique-username.directive';
import { UniqueEmailValidator } from 'src/app/shared/directives/unique-email/unique-email.directive';

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  form: FormGroup | undefined;
  userId: string | undefined;
  roles: Rol[] = [];
  selectedDescription: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private roleService: RolService,
    private router: Router,
    private snackbar: MatSnackBar,
    private asyncIdentificacionValidator: UniqueIdentificacionValidator,
    private asyncUsernameValidator: UniqueUsernameValidator,
    private asyncEmailValidator: UniqueEmailValidator,
  ) {
  }

  ngOnInit(): void {
    this.getRoles();
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.userId = params.get('id') || '';
          if (this.userId) {
            return this.userService.getUser(this.userId);
          } else {
            return of(UserDetailComponent.getEmptyUser());
          }
        })
      )
      .subscribe((response: User) => {
        this.createForm(response);
      });
  }

  get identificacion() {
    return this.form?.get('identificacion');
  }

  get nombres() {
    return this.form?.get('nombres');
  }

  get username() {
    return this.form?.get('username');
  }

  get email() {
    return this.form?.get('email');
  }

  get idRol() {
    return this.form?.get('idRol');
  }

  get password() {
    return this.form?.get('password');
  }

  get passwordConfirmation() {
    return this.form?.get('password_confirmation');
  }

  private static getEmptyUser(): User {
    return {
      nombres: '',
      username: '',
      email: '',
      identificacion: '',
      empresa: '',
    }
  }

  private createForm(user: User): void {
    this.form = this.fb.group({
      identificacion: [user.identificacion, [Validators.required]],
      nombres: [user.nombres, [Validators.required]],
      username: [user.username, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      idRol: [user.rol?.codigo, [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
        Validators.minLength(8)
      ]],
      password_confirmation: [''],
      empresa: [user.empresa],
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
    this.setValidators();
    this.setDescription(user.rol?.codigo);
  }

  private getRoles(): any {
    this.roleService.getRoles()
      .subscribe((response: Rol[]) => {
        this.roles = response;
      });
  }

  backMenu() {
    this.router.navigate(['/users']);
  }

  saveForm() {
    if (this.form?.invalid) {
      return;
    }

    const body = this.form?.value;
    if (this.userId) {
      this.userService.updateUser(body)
        .subscribe({
          next: () => {
            this.snackbar.open('Usuario actualizado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.router.navigate(['/users']);
          },
          error: (err: HttpErrorResponse) => {
            this.snackbar.open(err.error.message, 'Cerrar', {
              duration: 3000
            });
          }
        })
    } else {
      this.userService.addUser(body)
        .subscribe({
          next: () => {
            this.snackbar.open('Usuario creado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.backMenu();
          },
          error: (error: HttpErrorResponse) => {
            this.snackbar.open(error.message, 'OK', {
              duration: 2000,
              verticalPosition: 'bottom'
            });        }
        });
    }
  }

  private setValidators() {
    if (!this.userId) {
      this.identificacion?.setAsyncValidators(
        [
          this.asyncIdentificacionValidator.validate.bind(this.asyncIdentificacionValidator)
        ]
      );
      this.username?.setAsyncValidators(
        [
          this.asyncUsernameValidator.validate.bind(this.asyncUsernameValidator)
        ]
      );
      this.email?.setAsyncValidators(
        [
          this.asyncEmailValidator.validate.bind(this.asyncEmailValidator)
        ]
      );
    }
  }

  setDescription(code?: string): void {
    if (!code) {
      this.selectedDescription = '';
    }
    this.selectedDescription = this.roles.find(rol => rol.codigo === code)?.descripcion || '';
  }
}
