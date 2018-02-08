import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course.client.model';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-course-details',
  templateUrl: './user-course-details.component.html',
  styleUrls: ['./user-course-details.component.css']
})
export class UserCourseDetailsComponent implements OnInit {

  @Input('Course') Course: Course;
  id: string;

  constructor(
    private service: CourseService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (!this.Course) {
      this.route.queryParams
        .subscribe(params => this.id = params.id);

      if (this.id) {
        this.service.getOne(this.id)
          .subscribe(Course => this.Course = Course)
      }
    }
  }

}
