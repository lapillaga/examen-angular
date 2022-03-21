import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {

  constructor(private userService: UserService) {
  }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(800)
      .pipe(
        switchMap(() => this.userService.checkUsernameIsTaken(ctrl.value)),
        map(exists => {
          if (exists) {
            return {uniqueUsername: true};
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appUniqueUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUsernameValidator),
      multi: true
    }
  ]
})
export class UniqueUsernameDirective {

  constructor(private validator: UniqueUsernameValidator) {
  }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
