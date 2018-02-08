import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  admin: boolean = false;

  constructor(
    private service: UserService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // if (localStorage.getItem('userId')) {
    this.service.getOne(localStorage.getItem('userId'))
      .subscribe(user => {
        this.admin = user.admin;
        console.log(this.admin);
      });
    // }
  }

  // ngDoCheck() {
  //   this.cdRef.detectChanges();
  // }
}
