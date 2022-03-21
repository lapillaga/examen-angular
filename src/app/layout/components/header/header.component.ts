import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  clickEvent() {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
