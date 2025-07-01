import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Predmet } from '../../model/predmet';

@Component({
  selector: 'app-student-prijava',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-prijava.component.html',
  styleUrls: ['./student-prijava.component.css']
})
export class StudentPrijavaComponent implements OnInit {

  predmeti: Predmet[] = [];
  studentId = 1; // TODO: preuzeti iz tokena
  uspesnaPrijava = false;
  greska: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.ucitajPredmete();
  }

  ucitajPredmete(): void {
    this.studentService.getPredmetiKojeSlusa(this.studentId).subscribe({
      next: data => this.predmeti = data,
      error: err => console.error(err)
    });
  }

  prijavi(predmetId: number): void {
    this.uspesnaPrijava = false;
    this.greska = '';

    this.studentService.prijaviIspit(this.studentId, predmetId).subscribe({
      next: () => this.uspesnaPrijava = true,
      error: err => {
        console.error(err);
        this.greska = err.error?.message || 'Greška pri prijavi ispita.';
      }
    });
  }
}
