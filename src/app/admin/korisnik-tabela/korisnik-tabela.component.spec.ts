import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikTabelaComponent } from './korisnik-tabela.component';

describe('KorisnikTabelaComponent', () => {
  let component: KorisnikTabelaComponent;
  let fixture: ComponentFixture<KorisnikTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnikTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
