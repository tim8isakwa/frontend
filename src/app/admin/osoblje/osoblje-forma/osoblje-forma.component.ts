import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrovaniKorisnik } from '../../../model/registrovaniKorisnik';
import { CommonModule } from '@angular/common';
import { KorisnikFormaComponent } from '../../../registrovani-korisnik/korisnik-forma/korisnik-forma.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-osoblje-forma',
  imports: [CommonModule, ReactiveFormsModule, KorisnikFormaComponent],
  templateUrl: './osoblje-forma.component.html',
  styleUrl: './osoblje-forma.component.css'
})
export class OsobljeFormaComponent {
  korisnikForma!: FormGroup;
  osobljeForm!: FormGroup;

  @Output()
  korisnikSaved = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.osobljeForm = this.fb.group({
      korisnik: this.fb.group({
        korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        lozinka: ['', [Validators.required, Validators.minLength(6)]],
        potvrdaLozinke: ['', Validators.required]
      })
    }, {
      validators: this.potvrdaLozinkeValidator
    })
  }
  
  get korisnikFormGroup(): FormGroup {
    return this.osobljeForm.get('korisnik') as FormGroup;
  }

  isInvalid(controlName: string): boolean {
    const control = this.osobljeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  sacuvaj() {
    if (this.osobljeForm.valid) {
      const korisnik: RegistrovaniKorisnik = this.osobljeForm.get('korisnik')?.value;
    
      this.adminService.addOsoblje(korisnik).subscribe({
        next: () => {
          alert("Kreiranje je uspešno.")
          this.korisnikSaved.emit();
          this.osobljeForm.reset();
        }, error: (err) => console.error("Greška pri kreiranju osoblja: ", korisnik)
      })
    } else {
      alert("Forma nije validna. Proverite polja.");
    }
  }
}
