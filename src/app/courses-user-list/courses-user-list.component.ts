import { Component, OnInit } from '@angular/core';
import { Course } from '../course.client.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-user-list',
  templateUrl: './courses-user-list.component.html',
  styleUrls: ['./courses-user-list.component.css']
})
export class CoursesUserListComponent implements OnInit {

  courses: Course[];
  selectedCourse: Course;
  showall: string;

  constructor(
    private service: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.showall)
      .subscribe(params => this.showall = params.showall);

    this.service.getAll()
      .subscribe(courses => this.courses = courses);
  }

  selectCourse(course) {
    this.selectedCourse = course;
  }

  join() {
    console.log(this.selectedCourse);
    this.service.addPendingUser(this.selectedCourse._id)
      .subscribe((course) => console.log(course));
  }

  show(course: Course) {
    return course.author === localStorage.getItem('userId');
  }

  isAuthor(course: Course) {
    if (this.showall == 'true') {
      return true;
    }
    return course.author === localStorage.getItem('userId');
  }

  manage() {
    this.router.navigate(['courses/access'], {
      queryParams: {
        id: this.selectedCourse._id,
      }
    });
  }

  showLessons() {
    this.router.navigate(['courses/lesson'], {
      queryParams: {
        id: this.selectedCourse._id,
      }
    });
  }
}
