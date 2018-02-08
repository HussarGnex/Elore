import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUserHeaderComponent } from './course-user-header.component';

describe('CourseUserHeaderComponent', () => {
  let component: CourseUserHeaderComponent;
  let fixture: ComponentFixture<CourseUserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseUserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
