import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.client.model';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {

  id: string;
  Course: Course;
  selectedLesson;

  constructor(
    private service: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => this.id = params.id);

    this.service.getOne(this.id)
      .subscribe(course => this.Course = course);
  }

  selectLesson(lesson) {
    this.selectedLesson = lesson;
  }

}
