import { Course } from './../course.client.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  courses: Course[];
  selectedCourse: Course;

  constructor(private service: CourseService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(courses => this.courses = courses);
  }

  selectCourse(course) {
    this.selectedCourse = course;
  }

  getIndexOfCourse(courseId) {
    return this.courses.findIndex((course) => {
      return course._id === courseId;
    });
  }

  addCourse(course: Course, index?: number) {
    if (index) {
      this.courses.splice(index, 0, course);
    }
  }

  deleteCourse(courseId) {
    const index = this.getIndexOfCourse(courseId);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.selectedCourse = null;
    }
    return index;
  }

  updateCourse(course: Course) {
    let oldCourse;
    const index = this.getIndexOfCourse(course._id);
    if (index !== -1) {
      oldCourse = this.courses[index];
      this.courses[index] = course;
      this.selectedCourse = course;
    }
    return oldCourse;
  }

  isAuthor(course: Course) {
    return course.author === localStorage.getItem('userId');
  }

}
