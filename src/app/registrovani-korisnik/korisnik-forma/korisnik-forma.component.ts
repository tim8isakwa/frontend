import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-korisnik-forma',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './korisnik-forma.component.html',
  styleUrl: './korisnik-forma.component.css'
})
export class KorisnikFormaComponent {
  @Input()
  korisnikForm!: FormGroup;

  isInvalid(controlName: string): boolean {
    const control = this.korisnikForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
