import { User } from './../user.client.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(users => this.users = users);
  }

  selectUser(user) {
    this.selectedUser = user;
  }

  getIndexOfUser(userId) {
    return this.users.findIndex((user) => {
      return user._id === userId;
    });
  }

  addUser(user: User, index?: number) {
    if (index) {
      this.users.splice(index, 0, user);
    }
  }

  update() {

  }

  deleteUser(userId) {
    const index = this.getIndexOfUser(userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.selectedUser = null;
    }
    return index;
  }

  updateUser(user: User) {
    let oldUser;
    const index = this.getIndexOfUser(user._id);
    if (index !== -1) {
      oldUser = this.users[index];
      this.users[index] = user;
      this.selectedUser = user;
    }
    return oldUser;
  }
}
