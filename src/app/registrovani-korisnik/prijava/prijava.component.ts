import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prijava',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css'
})
export class PrijavaComponent {
  prijavaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.prijavaForm = this.fb.group({
      korisnickoIme: ['', [Validators.required]],
      lozinka: ['', [Validators.required]]
    })
  }

  isInvalid(controlName: string): boolean {
    const control = this.prijavaForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  prijaviSe() {
    if (this.prijavaForm.valid) {
      const credentials = {
        korisnickoIme: this.prijavaForm.get('korisnickoIme')?.value,
        lozinka: this.prijavaForm.get('lozinka')?.value
      }

      this.authService.login(credentials).subscribe({
        next: () => {
          if (this.authService.hasRole(['ROLE_ADMIN'])) {
            this.router.navigate(['/admin-dashboard']);
          } else if (this.authService.hasRole(['ROLE_OSOBLJE'])) {
            this.router.navigate(['/osoblje-dashboard']);
          } else if (this.authService.hasRole(['ROLE_NASTAVNIK'])) {
            this.router.navigate(['/univerzitet']);
          } else if (this.authService.hasRole(['ROLE_STUDENT'])) {
            this.router.navigate(['/student-dashboard']);
          } else {
            this.router.navigate(['/univerzitet']);
          }
        },
        error: (err) => console.error("Greske prilikom prijave: ", err)
      });
    } else {
      alert("Neispravno korisničko ime ili lozinka.");
    }
  }

  registrujSe(): void {
    this.router.navigate(['/registracija']);
  }
}
