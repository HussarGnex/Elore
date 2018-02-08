import { Observable } from 'rxjs/Observable';
import { Course } from './course.client.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CourseService {

  url = 'http://localhost:8000/api/course';

  constructor(
    private http: Http,
  ) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getOne(courseId: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.url + '/' + courseId + token, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(course: Course) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.url + token, JSON.stringify(course), options)
      .catch(this.handleError);
  }

  update(course: Course) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.url + '/' + course._id + token, JSON.stringify(course), options)
      .catch(this.handleError);
  }

  addPendingUser(courseId: String) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.url + '/pending/' + courseId + token, options)
      .catch(this.handleError);
  }

  delete(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete(this.url + '/' + id + token, options)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw('Not found!');
    }
    if (error.status === 400) {
      return Observable.throw('Bad request!');
    }
    if (error.status === 401) {
      return Observable.throw('Unathenticated!')
    }
    if (error.status === 500) {
      return Observable.throw('DB');
    }
    return Observable.throw('Undefined error! (HTTP)');
  }

}
