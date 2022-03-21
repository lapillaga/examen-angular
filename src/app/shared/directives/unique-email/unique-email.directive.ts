import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniqueEmailValidator implements AsyncValidator {

  constructor(private userService: UserService) {
  }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(800)
      .pipe(
        switchMap(() => this.userService.checkEmailIsTaken(ctrl.value)),
        map(exists => {
          if (exists) {
            return {uniqueEmail: true};
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appUniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailValidator),
      multi: true
    }
  ]
})
export class UniqueEmailDirective {

  constructor(private validator: UniqueEmailValidator) {
  }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
