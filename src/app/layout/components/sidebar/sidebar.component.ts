import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  status: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  clickEvent(){
    this.status = !this.status;
  }
}
