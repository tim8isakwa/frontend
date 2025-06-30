import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaComponent } from './izmena.component';

describe('IzmenaComponent', () => {
  let component: IzmenaComponent;
  let fixture: ComponentFixture<IzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzmenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
