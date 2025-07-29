import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KorisnikFormaComponent } from '../../../registrovani-korisnik/korisnik-forma/korisnik-forma.component';
import { AdresaFormaComponent } from '../../adresa-forma/adresa-forma.component';
import { ZvanjeFormaComponent } from '../zvanje-forma/zvanje-forma.component';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-nastavnik-forma',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KorisnikFormaComponent,
    AdresaFormaComponent,
    ZvanjeFormaComponent
  ],
  templateUrl: './nastavnik-forma.component.html',
  styleUrls: ['./nastavnik-forma.component.css']
})
export class NastavnikFormaComponent {
  @Output() nastavnikSaved = new EventEmitter<any>();

  nastavnikForm: FormGroup;

  constructor(private fb: FormBuilder, private nastavnikService: NastavnikService) {
    this.nastavnikForm = this.fb.group({
      korisnik: this.fb.group({
        korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        lozinka: ['', [Validators.required, Validators.minLength(6)]],
        potvrdaLozinke: ['', Validators.required]
      }),
      jmbg: ['', [Validators.minLength(13), Validators.maxLength(13)]],
      ime: ['', Validators.required],
      biografija: [''],
      adresa: this.fb.group({
        ulica: ['', Validators.required],
        broj: ['', Validators.required],
        mesto: ['', Validators.required],
        drzava: ['', Validators.required]
      }),
      zvanje: this.fb.group({
        tipZvanja: ['', Validators.required],
        naucnaOblast: ['', Validators.required],
        datumIzbora: ['', Validators.required],
        datumPrestanka: ['', Validators.required]
      })
      //zvanja: this.fb.array([])
    }, { validators: this.potvrdaLozinkeValidator });
  }

  get korisnikForm(): FormGroup {
    return this.nastavnikForm.get('korisnik') as FormGroup;
  }

  get adresaForm(): FormGroup {
    return this.nastavnikForm.get('adresa') as FormGroup;
  }

  get zvanjeForm(): FormGroup {
    return this.nastavnikForm.get('zvanje') as FormGroup;
  }

  // getZvanjeFormGroup(control: AbstractControl): FormGroup {
  //   return control as FormGroup;
  // }

  // get zvanja(): FormArray {
  //   return this.nastavnikForm.get('zvanja') as FormArray;
  // }

  // dodajZvanje() {
  //   const zvanjeForm = this.fb.group({
  //     tipZvanja: ['', Validators.required],
  //     naucnaOblast: ['', Validators.required],
  //     datumIzbora: ['', Validators.required],
  //     datumPrestanka: ['', Validators.required]
  //   });
  //   this.zvanja.push(zvanjeForm);
  // }

  // ukloniZvanje(index: number) {
  //   this.zvanja.removeAt(index);
  // }

  isInvalid(controlName: string): boolean {
    const control = this.nastavnikForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  kreiraj() {
    if (this.nastavnikForm.valid) {
      const nastavnikData = this.nastavnikForm.value;
      nastavnikData.korisnickoIme = this.korisnikForm.get('korisnickoIme')?.value;
      nastavnikData.lozinka = this.korisnikForm.get('lozinka')?.value;
      nastavnikData.email = this.korisnikForm.get('email')?.value;

      this.nastavnikService.create(nastavnikData).subscribe({
        next: () => {
          alert("Kreiranje nastavnika je uspešno.");
          this.nastavnikSaved.emit();
          this.nastavnikForm.reset();
         // this.zvanja.clear();
        },
        error: err => console.error 
          ("Greška pri kreiranju nastavnika: ", nastavnikData)
      });
    } else {
      alert("Forma nije validna. Proverite polja.");
    }
  }
}
