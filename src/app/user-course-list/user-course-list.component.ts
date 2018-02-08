import { Component, OnInit } from '@angular/core';
import { Course } from '../course.client.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-user-course-list',
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.css']
})
export class UserCourseListComponent implements OnInit {

  Courses: Course[];
  selectedCourse: Course;

  constructor(private service: CourseService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(courses => this.Courses = courses);
  }

  selectCourse(course) {
    this.selectedCourse = course;
  }

}
