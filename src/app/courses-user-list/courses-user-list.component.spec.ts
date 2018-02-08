import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesUserListComponent } from './courses-user-list.component';

describe('CoursesUserListComponent', () => {
  let component: CoursesUserListComponent;
  let fixture: ComponentFixture<CoursesUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
