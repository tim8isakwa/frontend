import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Obavestenje } from '../../../model/obavestenje';
import { OsobljeService } from '../../../services/osoblje.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-obavestenje-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './obavestenje-forma.component.html',
  styleUrl: './obavestenje-forma.component.css'
})
export class ObavestenjeFormaComponent {
  obavestenjeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private osobljeService: OsobljeService
  ) {
    this.obavestenjeForm = this.fb.group({
      naslov: ['', Validators.required],
      sadrzaj: ['', Validators.required]
    })
  }

  isInvalid(controlName: string): boolean {
    const control = this.obavestenjeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  kreiraj(): void {
    if (this.obavestenjeForm.valid) {
      const obavestenje: Obavestenje = this.obavestenjeForm.value;

      this.osobljeService.createObavestenje(obavestenje).subscribe({
        next: () => {
          alert('Uspešno kreirano obaveštenje');
          this.obavestenjeForm.reset();
        },
        error: (err) => console.error('Greška pri čuvanju:', err)
      });
    } else {
      alert('Forma nije validna. Proverite sva obavezna polja.');
    }
  }
}
