import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: UserService, private router: Router) {

  }

  ngOnInit() {
    if (!this.service.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
  }

}
