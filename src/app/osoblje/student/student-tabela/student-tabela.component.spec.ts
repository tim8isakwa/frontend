import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTabelaComponent } from './student-tabela.component';

describe('StudentTabelaComponent', () => {
  let component: StudentTabelaComponent;
  let fixture: ComponentFixture<StudentTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
