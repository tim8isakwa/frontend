import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdresaFormaComponent } from '../../../admin/adresa-forma/adresa-forma.component';
import { OsobljeService } from '../../../services/osoblje.service';
import { Student } from '../../../model/student';
import { StudentNaGodini } from '../../../model/studentNaGodini';
import { KorisnikFormaComponent } from '../../../registrovani-korisnik/korisnik-forma/korisnik-forma.component';

@Component({
  selector: 'app-student-forma',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    AdresaFormaComponent,
    KorisnikFormaComponent
  ],
  templateUrl: './student-forma.component.html',
  styleUrls: ['./student-forma.component.css']
})
export class StudentFormaComponent {
  @Output() studentSaved = new EventEmitter<any>();

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private osobljeService: OsobljeService
  ) {
    this.studentForm = this.fb.group({
      korisnik: this.fb.group({
        korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        lozinka: ['', [Validators.required, Validators.minLength(6)]],
        potvrdaLozinke: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.email]],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      ime: ['', Validators.required],
      adresa: this.fb.group({
        ulica: ['', Validators.required],
        broj: ['', Validators.required],
        mesto: ['', Validators.required],
        drzava: ['', Validators.required]
      }),
      program: ['', Validators.required],
      godina: ['', Validators.required],
      brojIndeksa: ['', Validators.required],
      datumUpisa: ['', Validators.required]
    });
  }
  
  get korisnikForm(): FormGroup {
    return this.studentForm.get('korisnik') as FormGroup;
  }

  get adresaFormGroup(): FormGroup {
    return this.studentForm.get('adresa') as FormGroup;
  }

  isInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  kreiraj(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value; 

      this.osobljeService.createStudent(studentData).subscribe({
        next: () => {
          alert('Student uspešno kreiran.');
          this.studentForm.reset();
          this.studentSaved.emit();
        },
        error: (err) => {
          console.error('Greška pri kreiranju studenta:', err);
          alert('Greška prilikom čuvanja studenta.');
        }
      });
    } else {
      alert('Forma nije validna. Proverite sva polja.');
    }
  }
}
