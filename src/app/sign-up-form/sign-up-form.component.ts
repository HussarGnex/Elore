import { User } from './../user.client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  User: User;

  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ),
      email: new FormControl('',
        Validators.email),
    }),
    userInfo: new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
    })
  });

  constructor(
    private service: UserService,
    private NgZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.User = new User('', '', '', '', '');
  }

  register() {
    this.User = new User(
      this.username.value,
      this.password.value,
      this.name.value,
      this.surname.value,
      this.email.value,
    )
    this.service.create(this.User)
      .subscribe(
      () => this.form.setErrors({ userAdded: true }),
      error => console.log(error)
      );
  }

  loginPage() {
    this.NgZone.run(() => {
      this.router.navigate(['/signin']);
    })
  }

  get username() {
    return this.form.get('account.username');
  }

  get password() {
    return this.form.get('account.password');
  }

  get email() {
    return this.form.get('account.email');
  }

  get name() {
    return this.form.get('userInfo.name');
  }

  get surname() {
    return this.form.get('userInfo.surname');
  }
}
