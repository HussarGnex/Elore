import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { UserListComponent } from './user-list/user-list.component';

import { CourseService } from './course.service';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { LogoutComponent } from './logout/logout.component';
import { CourseHeaderComponent } from './course-header/course-header.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserCourseListComponent } from './user-course-list/user-course-list.component';
import { UserCourseDetailsComponent } from './user-course-details/user-course-details.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { CoursesUserListComponent } from './courses-user-list/courses-user-list.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CourseUserHeaderComponent } from './course-user-header/course-user-header.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    UserListComponent,
    UserFormComponent,
    HeaderComponent,
    UserHeaderComponent,
    SignUpFormComponent,
    SignInFormComponent,
    LogoutComponent,
    CourseHeaderComponent,
    CourseFormComponent,
    ManageCourseComponent,
    ViewProfileComponent,
    UserCourseListComponent,
    UserCourseDetailsComponent,
    LessonFormComponent,
    CoursesUserListComponent,
    MainHeaderComponent,
    CourseUserHeaderComponent,
    LessonsListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: MainHeaderComponent, children: [
          {
            path: 'courses', component: CourseUserHeaderComponent, children: [
              { path: 'list', component: CoursesUserListComponent },
              { path: 'all', component: CoursesUserListComponent },
              { path: 'add', component: CourseFormComponent },
              { path: 'access', component: ManageCourseComponent },
              { path: 'lesson', component: LessonsListComponent },
              { path: 'show', component: UserCourseDetailsComponent }
            ]
          },
          {
            path: 'admin', component: HeaderComponent, children: [
              {
                path: 'courses', children: [
                  { path: 'list', component: CourseListComponent },
                  { path: 'add', component: CourseFormComponent },
                ]
              },
              {
                path: 'users', children: [
                  { path: 'list', component: UserListComponent },
                  { path: 'add', component: UserFormComponent },
                ]
              }
            ]
          },
          { path: 'profile', component: ViewProfileComponent },
          { path: 'signup', component: SignUpFormComponent },
        ],
      },
      { path: 'signin', component: SignInFormComponent },
      { path: 'logout', component: LogoutComponent },
    ]),
  ],
  providers: [
    CourseService,
    UserService,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
