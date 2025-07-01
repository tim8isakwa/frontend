import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Predmet } from '../../model/predmet';

@Component({
  selector: 'app-student-pregled',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-pregled.component.html',
  styleUrls: ['./student-pregled.component.css']
})
export class StudentPregledComponent implements OnInit {

  predmeti: Predmet[] = [];
  studentId = 1; // TODO: kasnije iz tokena

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
}
