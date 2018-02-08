import { Component, OnInit } from '@angular/core';
import { Course } from '../course.client.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';
import { User } from '../user.client.model';
import { Lesson } from '../lesson.client.interface';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {

  course: Course;
  users: User;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        this.courseService.getOne(params.id)
          .subscribe(course => this.course = course);
      });

    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  add(userId) {
    if (this.course.allowedUsers.indexOf(userId) < 0) {
      this.course.allowedUsers.push(userId);
    }
  }

  remove(userId) {
    if (this.course.allowedUsers.indexOf(userId) > -1) {
      this.course.allowedUsers.splice(this.course.allowedUsers.indexOf(userId), 1);
    }
  }

  addLesson(lesson: Lesson) {
    this.course.lesson.push(lesson);
  }

  removeLesson(lesson: Lesson) {
    if (this.course.lesson.indexOf(lesson) > -1) {
      this.course.lesson.splice(this.course.lesson.indexOf(lesson), 1);
    }
  }

  moveToAllowed(id: string) {
    if (this.course.pendingUsers.indexOf(id) > -1) {
      this.course.pendingUsers.splice(this.course.pendingUsers.indexOf(id), 1);
      this.course.allowedUsers.push(id);
    }
  }

  removePending(id: string) {
    if (this.course.pendingUsers.indexOf(id) > -1) {
      this.course.pendingUsers.splice(this.course.pendingUsers.indexOf(id), 1);
    }
  }

  accept() {
    this.courseService.update(this.course)
      .subscribe(null,
      error => console.log(error));
  }
}
