import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentObavestenjeComponent } from './student-obavestenje.component';

describe('StudentObavestenjeComponent', () => {
  let component: StudentObavestenjeComponent;
  let fixture: ComponentFixture<StudentObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentObavestenjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
