import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { OsobljeService } from '../../services/osoblje.service';
import { StudijskiProgramService } from '../../services/studijski-program.service';
import { PredmetService } from '../../services/predmet.service';
import { StudijskiProgram } from '../../model/studijskiProgram';
import { Predmet } from '../../model/predmet';

@Component({
  selector: 'app-raspored-nastave',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './raspored-nastave.component.html',
  styleUrl: './raspored-nastave.component.css'
})
export class RasporedNastaveComponent {
  @Output() rasporedNastaveSaved = new EventEmitter<any>();
  rasporedNastaveForm: FormGroup;

  programi: StudijskiProgram[] = [];
  predmeti: Predmet[] = [];

  constructor(
    private fb: FormBuilder,
    private osobljeService: OsobljeService,
    private programService: StudijskiProgramService,
    private predmetService: PredmetService
  ) {
    this.rasporedNastaveForm = this.fb.group({
      program: ['', Validators.required],
      godinaStudija: ['', Validators.required],
      timeTable: this.fb.group({
        ponedeljak: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }),
        utorak: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }),
        srijeda: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }),
        cetvrtak: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }),
        petak: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }),
      })
    })

    this.ucitajStudijskePrograme();
    this.ucitajPredmete();
  }
  
  isInvalid(controlName: string): boolean {
    const control = this.rasporedNastaveForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ucitajStudijskePrograme(): void {
    this.programService.getAll().subscribe({
      next: data => this.programi = data,
      error: (err) => console.error('Greška pri učitavanju programa:', err)
    });
  }

  ucitajPredmete(): void {
    this.predmetService.getAll().subscribe({
      next: data => this.predmeti = data,
      error: (err) => console.error('Greška pri učitavanju predmeta: ', err)
    });
  }

  kreiraj(): void {
    if (this.rasporedNastaveForm.valid) {
      
    }
  }
}
