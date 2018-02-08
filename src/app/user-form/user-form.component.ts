import { UserService } from './../user.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.client.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input('User') User: User;
  @Input('deleteHandler') deleteHandler: Function;
  @Input('addHandler') addHandler: Function;
  @Input('updateHandler') updateHandler: Function;



  form = new FormGroup({
    account: new FormGroup({
      login: new FormControl('',
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

  constructor(private service: UserService) { }

  ngOnInit() {
    if (!this.User) {
      this.User = new User('', '', '', '', '');
    }
  }

  deleteUser(user: User) {
    const index = this.deleteHandler(user._id);
    this.service.delete(user._id)
      .subscribe(null, (error) => {
        this.addHandler(user, index);
      });
  }
  updateUser(user: User) {
    const oldUser = this.updateHandler(user);
    this.service.update(user)
      .subscribe(null, (error) => {
        this.updateHandler(oldUser);
      });
  }

  addUser(user: User) {
    this.service.create(user)
      .subscribe(null, error => console.log(error));
  }

  divClasses() {
    const divClasses = {
      'col-md-4': !this.User._id,
      'col-md-offset-4': !this.User._id,
      'text-center': !this.User._id,
    };

    return divClasses;
  }


  get login() {
    return this.form.get('account.login');
  }

  get password() {
    return this.form.get('account.password');
  }

  get email() {
    return this.form.get('account.email');
  }

  get name() {
    return this.form.get('userInfo.username');
  }

  get surname() {
    return this.form.get('userInfo.surname');
  }

}
