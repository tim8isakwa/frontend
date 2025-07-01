import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fakultet } from '../../../model/fakultet';
import { FakultetService } from '../../../services/fakultet.service';
import { UniverzitetService } from '../../../services/univezitet.service';
import { NastavnikService } from '../../../services/nastavnik.service';
import { CommonModule } from '@angular/common';
import { AdresaFormaComponent } from '../../adresa-forma/adresa-forma.component';

@Component({
  selector: 'app-fakultet-forma',
  imports: [CommonModule, ReactiveFormsModule, AdresaFormaComponent],
  templateUrl: './fakultet-forma.component.html',
  styleUrl: './fakultet-forma.component.css'
})
export class FakultetFormaComponent {
  fakultetForm: FormGroup;
  univerziteti: any[] = [];
  nastavnici: any[] = [];

  @Input()
  fakultetZaIzmenu?: Fakultet;
  @Output()
  fakultetSaved = new EventEmitter<Fakultet>();

  constructor(
    private fb: FormBuilder,
    private fakultetService: FakultetService,
    private univerzitetService: UniverzitetService,
    private nastavnikService: NastavnikService
  ) {
    this.fakultetForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      opis: [],
      adresa: this.fb.group({
        broj: ['', Validators.required],
        ulica: ['', Validators.required],
        mesto: ['', Validators.required],
        drzava: ['', Validators.required]
      }),
      dekan: [''],
      programi: this.fb.array([]),
      univerzitet: ['']
    });

    this.ucitajUniverzitete();
    this.ucitajNastavnike();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fakultetZaIzmenu'] && this.fakultetZaIzmenu) {
      this.fakultetForm.patchValue(this.fakultetZaIzmenu);
    } else {
      this.fakultetForm.reset();
    }
  } 

  isInvalid(controlPath: string): boolean {
    const control = this.fakultetForm.get(controlPath);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get adresaFormGroup(): FormGroup {
    return this.fakultetForm.get('adresa') as FormGroup;
  }

  get programi(): FormArray {
    return this.fakultetForm.get('programi') as FormArray;
  }

  ucitajUniverzitete(): void {
    this.univerzitetService.getAll().subscribe({
      next: data => this.univerziteti = data,
      error: err => console.error('Greška pri učitavanju univerziteta:', err)
    });
  }

  ucitajNastavnike(): void {
    this.nastavnikService.getAll().subscribe({
      next: data => this.nastavnici = data,
      error: err => console.error('Greška pri učitavanju nastavnika:', err)
    });
  }

  dodajProgram(): void {
    const programGroup = this.fb.group({
      naziv: ['', [Validators.required]]
    });

    this.programi.push(programGroup);
  }

  ukloniProgram(index: number): void {
    this.programi.removeAt(index);
  }

  sacuvaj(): void {
    if (this.fakultetForm.valid) {
      const fakultet: Fakultet = this.fakultetForm.value;

      if (this.fakultetZaIzmenu) {
        this.fakultetService.update(this.fakultetZaIzmenu.id!, fakultet).subscribe({
          next: () => {
            alert("Fakultet je uspesno sacuvan.");
            this.fakultetForm.reset();
            this.fakultetSaved.emit()
          },
          error: (err) => console.error('Greška pri čuvanju:', err)
        });
      } else {
        this.fakultetService.create(fakultet).subscribe({
          next: () => {
          alert("Novi fakultet je uspešno kreiran.");
          this.fakultetForm.reset();
          this.fakultetSaved.emit();
        },
          error: (err) => console.error("Greška pri kreiranju fakulteta: ", fakultet, err)
        });
      }
    } else {
      alert('Forma nije validna. Proverite sva obavezna polja.');
    }
  }
}

