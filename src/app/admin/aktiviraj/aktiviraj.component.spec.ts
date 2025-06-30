import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivirajComponent } from './aktiviraj.component';

describe('AktivirajComponent', () => {
  let component: AktivirajComponent;
  let fixture: ComponentFixture<AktivirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktivirajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktivirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
