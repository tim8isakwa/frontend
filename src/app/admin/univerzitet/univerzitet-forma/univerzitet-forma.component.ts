import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniverzitetService } from '../../../services/univezitet.service';
import { Univerzitet } from '../../../model/univerzitet';
import { Nastavnik } from '../../../model/nastavnik';
import { NastavnikService } from '../../../services/nastavnik.service';
import { NgClass } from '@angular/common';
import { AdresaFormaComponent } from '../../adresa-forma/adresa-forma.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-univerzitet-forma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdresaFormaComponent, NgClass],
  templateUrl: './univerzitet-forma.component.html',
  styleUrls: ['./univerzitet-forma.component.css']
})
export class UniverzitetFormaComponent implements OnInit {
  univerzitetForm: FormGroup;
  nastavnici: Nastavnik[] = [];

  constructor(
    private fb: FormBuilder,
    private univerzitetService: UniverzitetService,
    private nastavnikService: NastavnikService
  ) {
    this.univerzitetForm = this.fb.group({
      id: [null],
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      datumOsnivanja: ['', Validators.required],
      adresa: this.fb.group({
        broj: ['', Validators.required],
        ulica: ['', Validators.required],
        mesto: ['', Validators.required],
        drzava: ['', Validators.required]
      }),
      fakulteti: this.fb.array([]),
      rektor: ['', Validators.required],
      opis: ['']
    });
  }

  ngOnInit(): void {
    this.nastavnikService.getAll().subscribe({
      next: (nastavnici) => {
        this.nastavnici = nastavnici;

        this.univerzitetService.getAll().subscribe({
          next: (data) => {
            if (data.length > 0) {
              const univerzitet = data[0];

              const univerzitetRektor = this.nastavnici.find(
                n => n.id === univerzitet.rektor?.id
              );

              univerzitet.rektor = univerzitetRektor ?? null;
              this.univerzitetForm.patchValue(univerzitet);
          }
        },
        error: (err) => console.error('Greška pri učitavanju univerziteta:', err)
      });
      },
      error: (err) => console.error('Greška pri učitavanju nastavnika:', err)
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.univerzitetForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get adresaFormGroup(): FormGroup {
    return this.univerzitetForm.get('adresa') as FormGroup;
  }
  
  get fakulteti(): FormArray {
    return this.univerzitetForm.get('fakulteti') as FormArray;
  }

  dodajFakultet(): void {
    const fakultetGroup = this.fb.group({
      naziv: ['', Validators.required]
    });

    this.fakulteti.push(fakultetGroup);
  }

  ukloniFakultet(index: number): void {
    this.fakulteti.removeAt(index);
  }

  sacuvaj(): void {
    if (this.univerzitetForm.valid) {
      const univerzitet: Univerzitet = this.univerzitetForm.value;

      this.univerzitetService.save(univerzitet).subscribe({
        next: () => {
          alert('Uspešno sačuvan univerzitet');
          this.univerzitetForm.reset();
          this.fakulteti.clear();
        },
        error: (err) => console.error('Greška pri čuvanju:', err)
      });
    } else {
      alert('Forma nije validna. Proverite sva obavezna polja.');
    }
  }
}
