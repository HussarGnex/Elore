import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { User } from '../user.client.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('',
      [
        Validators.required,
      ]),
    password: new FormControl('',
      [
        Validators.required,
      ])
  });

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
  }

  signin() {
    const user = new User(
      this.login.value,
      this.password.value,
      '',
      '',
      '',
    );

    this.service.signin(user)
      .subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
      },
      error => console.log(error)
      );
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

}
