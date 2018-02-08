import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import { UserService } from '../user.service';
import { User } from '../user.client.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  id: String;
  user: User;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const localId = localStorage.getItem('userId');
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => this.id = params.id);

    if (localId && !this.id) {
      this.service.getOne(localId)
        .subscribe(user => this.user = user);
    }
    if (this.id) {
      this.service.getOne(this.id)
        .subscribe(user => this.user = user);
    }
  }

}
