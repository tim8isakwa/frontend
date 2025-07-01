import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrovaniKorisnik } from '../../../model/registrovaniKorisnik';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-osoblje-forma',
  imports: [],
  templateUrl: './osoblje-forma.component.html',
  styleUrl: './osoblje-forma.component.css'
})
export class OsobljeFormaComponent {

  korisnikForma!: FormGroup;
  osobljeFormForm!: FormGroup;

  @Output()
  korisnikSaved = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.osobljeFormForm = this.fb.group({
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
    return this.osobljeFormForm.get('korisnik') as FormGroup;
  }

  isInvalid(controlName: string): boolean {
    const control = this.osobljeFormForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  sacuvaj() {
    if (this.osobljeFormForm.valid) {
      const korisnik: RegistrovaniKorisnik = this.osobljeFormForm.value;
    
      this.authService.addOsoblje(korisnik).subscribe({
        next: () => {
          alert("Kreiranje je uspešna.")
          this.korisnikSaved.emit();
          this.osobljeFormForm.reset();
        }, error: (err) => console.error("Greška pri kreiranju osoblja: ", err)
      })
    } else {
      alert("Forma nije validna. Proverite polja.");
    }
  }
}
