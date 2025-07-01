import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdresaFormaComponent } from '../../../admin/adresa-forma/adresa-forma.component';
import { StudentService } from '../../../services/student.service';
import { MenuToggleService } from '../../../services/menu-toggle.service';

@Component({
  selector: 'app-student-forma',
  imports: [CommonModule, ReactiveFormsModule, AdresaFormaComponent],
  templateUrl: './student-forma.component.html',
  styleUrls: ['./student-forma.component.css']
})
export class StudentFormaComponent {
  @Output() studentSaved = new EventEmitter<any>();

  studentForm: FormGroup;

  constructor(
    private menuToggleService: MenuToggleService,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      ime: ['', Validators.required],
      adresa: this.fb.group({
        ulica: ['', Validators.required],
        broj: ['', Validators.required],
        mesto: ['', Validators.required],
        drzava: ['', Validators.required]
      })
    });
  }

  onSomeAction() {
    this.menuToggleService.toggleMenu();
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

      this.studentService.create(studentData).subscribe({
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
