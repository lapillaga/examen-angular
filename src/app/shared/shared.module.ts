import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoadingDirective } from './directives/button-loading/button-loading.directive';
import { UppercaseDirective } from './directives/uppercase/uppercase.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueIdentificacionDirective } from './directives/unique-identificacion/unique-identificacion.directive';
import { UniqueEmailDirective } from './directives/unique-email/unique-email.directive';
import { UniqueUsernameDirective } from './directives/unique-username/unique-username.directive';
import { FilterUserPipe } from './pipes/filter-user/filter-user.pipe';


@NgModule({
  declarations: [
    ButtonLoadingDirective,
    UppercaseDirective,
    UniqueIdentificacionDirective,
    UniqueEmailDirective,
    UniqueUsernameDirective,
    FilterUserPipe
  ],
  exports: [
    ButtonLoadingDirective,
    UppercaseDirective,
    FilterUserPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
