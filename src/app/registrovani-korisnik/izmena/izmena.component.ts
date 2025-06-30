import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { AuthService } from '../../services/auth.service';
import { KorisnikFormaComponent } from '../korisnik-forma/korisnik-forma.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-izmena',
  imports: [CommonModule, ReactiveFormsModule, KorisnikFormaComponent],
  templateUrl: './izmena.component.html',
  styleUrl: './izmena.component.css'
})
export class IzmenaComponent implements OnInit {
  korisnikForma!: FormGroup;
  izmeniForm!: FormGroup;
  korisnikId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.izmeniForm = this.fb.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required]
    }, {
      validators: this.potvrdaLozinkeValidator
    });
  }

  ngOnInit(): void {
    this.korisnikId = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.findById(this.korisnikId).subscribe(korisnik => {
      this.izmeniForm.patchValue(korisnik);
    });
  }

  get korisnikFormGroup(): FormGroup {
    return this.izmeniForm.get('korisnik') as FormGroup;
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrda = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrda ? null : { lozinkeSeNePodudaraju: true };
  }

  izmeni() {
    if (this.izmeniForm.valid) {
      const korisnik: RegistrovaniKorisnik = this.izmeniForm.value;
      this.authService.update(this.korisnikId, korisnik).subscribe({
        next: () => alert("Izmena je uspešna"),
        error: err => console.error("Greška pri izmeni: ", err)
      });
    }
  }
}
