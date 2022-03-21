import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(value: any, filterTerm: string): Observable<User[]> {
    if (filterTerm === null) {
      filterTerm = '';
    }
    return this.userService.getUsers(filterTerm);
  }
}
