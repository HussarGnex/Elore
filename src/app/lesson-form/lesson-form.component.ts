import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course.client.model';
import { Lesson } from '../lesson.client.interface';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {

  @Input('course') course: Course;
  @Input('addHandler') addHandler: Function;
  @Input('removeHandler') removeHandler: Function;
  @Input('updateHandler') updateHandler: Function;

  form = new FormGroup({
    number: new FormControl('',
      [
        Validators.required,
      ]),
    title: new FormControl('',
      [
        Validators.required,
      ]),
    content: new FormControl('',
      [
        Validators.required,
      ]),
  });

  constructor(
    private service: CourseService,
  ) { }

  ngOnInit() {
  }

  add() {
    const lesson = {
      number: this.number.value,
      title: this.title.value,
      content: this.content.value
    };

    console.log(this.number.value);
    this.addHandler(lesson);
  }

  remove(lesson) {
    this.removeHandler(lesson);
  }

  get number() {
    return this.form.get('number');
  }

  get title() {
    return this.form.get('title');
  }

  get content() {
    return this.form.get('content');
  }
}
