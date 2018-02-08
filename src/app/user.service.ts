import { User } from './user.client.model';
import { CourseService } from './course.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  url = 'http://localhost:8000/api/user';

  constructor(
    private http: Http,
  ) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getOne(userId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.url + '/' + userId + token, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.url + token, JSON.stringify(user), options)
      .catch(this.handleError);
  }

  update(user: User) {
    console.log('->(1)');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(user);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.url + '/' + user._id + token, body, options)
      .catch(this.handleError);
  }

  delete(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete(this.url + '/' + id + token, options)
      .map(response => response.json() as String)
      .catch(this.handleError);
  }

  signin(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/signin', JSON.stringify(user), options)
      .map(response => response.json() as String)
      .catch(this.handleError);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw('Not found!');
    }
    if (error.status === 400) {
      return Observable.throw('Bad request!');
    }
    return Observable.throw('Undefined error!');
  }
}
