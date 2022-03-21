import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from 'src/app/modules/admin/users/list/list.component';
import { UserDetailComponent } from 'src/app/modules/admin/users/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'add',
    component: UserDetailComponent
  },
  {
    path: 'edit/:id',
    component: UserDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
