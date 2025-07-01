import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudijskiProgram } from '../../../model/studijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { FakultetService } from '../../../services/fakultet.service';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-studijski-program-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './studijski-program-forma.component.html',
  styleUrl: './studijski-program-forma.component.css'
})
export class StudijskiProgramFormaComponent {
  programForm: FormGroup;
  fakulteti: any[] = [];
  nastavnici: any[] = [];

  @Input()
  programZaIzmenu?: StudijskiProgram;
  @Output() programSaved = new EventEmitter<StudijskiProgram>();

  constructor(
    private fb: FormBuilder,
    private programService: StudijskiProgramService,
    private fakultetService: FakultetService,
    private nastavnikService: NastavnikService
  ) {
    this.programForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      opis: [''],
      rukovodilac: [''],
      fakultet: [''],
      godineStudija: ['']
    });

    this.ucitajFakultete();
    this.ucitajNastavnike();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['programZaIzmenu'] && this.programZaIzmenu) {
      this.programForm.patchValue(this.programZaIzmenu);
    } else {
      this.programForm.reset();
    }
  } 

  ucitajFakultete(): void {
    this.fakultetService.getAll().subscribe({
      next: data => this.fakulteti = data,
      error: (err) => console.error('Greška pri učitavanju fakulteta:', err)
    });
  }

  ucitajNastavnike(): void {
    this.nastavnikService.getAll().subscribe({
      next: data => this.nastavnici = data,
      error: (err) => console.error('Greška pri učitavanju nastavnika:', err)
    });
  }

  sacuvaj(): void {
    if (this.programForm.valid) {
      const program: StudijskiProgram = this.programForm.value;

      if (this.programZaIzmenu) {
        this.programService.update(this.programZaIzmenu.id!, program).subscribe({
          next: () => {
            alert("Studijski program je uspesno sacuvan.");
            this.programForm.reset();
            this.programSaved.emit()
          },
          error: (err) => console.error('Greška pri čuvanju:', err)
        });
      } else {
        this.programService.create(program).subscribe({
          next: () => {
          alert("Novi program je uspešno kreiran.");
          this.programForm.reset();
          this.programSaved.emit();
        },
          error: (err) => console.error("Greška pri kreiranju programa: ", program, err)
        });
      }
    } else {
      alert('Forma nije validna. Proverite sva obavezna polja.');
    }
  }
}