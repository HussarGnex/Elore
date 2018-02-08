import { CourseService } from './../course.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../course.client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input('Course') Course: Course;
  @Input('deleteHandler') deleteHandler: Function;
  @Input('addHandler') addHandler: Function;
  @Input('updateHandler') updateHandler: Function;

  form = new FormGroup({
    title: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ),
  });

  constructor(
    private service: CourseService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.Course) {
      this.Course = new Course('', '', '', '');
    }
  }

  deleteCourse(course: Course) {
    const index = this.deleteHandler(course._id);
    this.service.delete(course._id)
      .subscribe(null, (error) => {
        this.addHandler(course, index);
      });
  }
  updateCourse(course: Course) {
    const oldCourse = this.updateHandler(course);
    this.service.update(course)
      .subscribe(null, (error) => {
        this.updateHandler(oldCourse);
      });
  }

  addCourse(course: Course) {
    this.service.create(course)
      .subscribe(() => {
        this.form.setErrors({ courseAdded: true });
      },
      error => console.log(error));
  }

  manageAccess(courseId: string) {
    this.router.navigate(['courses/access'], {
      queryParams: {
        id: courseId,
      }
    });
  }

  divClasses() {
    const divClasses = {
      'col-md-4': !this.Course._id,
      'col-md-offset-4': !this.Course._id,
      'text-center': !this.Course._id,
    };

    return divClasses;
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

}
