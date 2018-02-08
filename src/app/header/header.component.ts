import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: UserService) { }

  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  ngOnInit() {
  }

}
