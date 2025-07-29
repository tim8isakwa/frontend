import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedIspitaComponent } from './raspored-ispita.component';

describe('RasporedIspitaComponent', () => {
  let component: RasporedIspitaComponent;
  let fixture: ComponentFixture<RasporedIspitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RasporedIspitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedIspitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
