import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPrijavaComponent } from './student-prijava.component';

describe('StudentPrijavaComponent', () => {
  let component: StudentPrijavaComponent;
  let fixture: ComponentFixture<StudentPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPrijavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
