import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KorisnikFormaComponent } from '../korisnik-forma/korisnik-forma.component';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registracija',
  imports: [CommonModule, ReactiveFormsModule, KorisnikFormaComponent],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css'
})
export class RegistracijaComponent {
  korisnikForma!: FormGroup;
  registracijaForm!: FormGroup;

  @Output()
  korisnikSaved = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registracijaForm = this.fb.group({
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
    return this.registracijaForm.get('korisnik') as FormGroup;
  }

  isInvalid(controlName: string): boolean {
    const control = this.registracijaForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  sacuvaj() {
    if (this.registracijaForm.valid) {
      const korisnik: RegistrovaniKorisnik = this.registracijaForm.value;
    
      this.authService.register(korisnik).subscribe({
        next: () => {
          alert("Registracija je uspešna.")
          this.korisnikSaved.emit();
          this.registracijaForm.reset();
        }, error: (err) => console.error("Greška pri registraciji korisnika: ", err)
      })
    } else {
      alert("Forma nije validna. Proverite polja.");
    }
  }

  prijaviSe(): void {
    this.router.navigate(['/prijava']);
  }
}
