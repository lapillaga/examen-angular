import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/modules/admin/users/confirmation/confirmation.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  searchCtrl = new FormControl();
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers('');
  }

  private getUsers(s: string): void {
    this.users$ = this.userService.getUsers(s);
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  getInitials(nameString: string): string {
    const allNames = nameString.trim().split(' ');
    return allNames.reduce((acc: string, curr: string, index: number) => {
      if (index === 0 || index === allNames.length - 2) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, '');
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(
      message,
      action,
      {
        duration: 3000,
      }
    );
  }

  delete(user: User) {
    this.dialog.open(ConfirmationComponent, {
      width: '250px',
      maxWidth: '100%',
    }).afterClosed()
      .subscribe((result: string) => {
        if (result === 'Ok') {
          this.userService.deleteUser(user.identificacion)
            .subscribe({
              next: (result: boolean) => {
                if (result) {
                  this.openSnackBar('Usuario eliminado correctamente', 'OK');
                  this.getUsers('');
                } else {
                  this.openSnackBar('No se pudo eliminar el usuario', 'OK');
                }
              },
              error: (err: HttpErrorResponse) => {
                this.openSnackBar(err.message, 'OK');
              }
            });
        }
      });
  }

  edit(user: User) {
    this.router.navigate(['edit', user.identificacion], { relativeTo: this.activatedRoute });
  }
}
