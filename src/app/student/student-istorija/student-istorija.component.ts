import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Polaganje } from '../../model/polaganje';

@Component({
  selector: 'app-student-istorija',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-istorija.component.html',
  styleUrls: ['./student-istorija.component.css']
})
export class StudentIstorijaComponent implements OnInit {

  polaganja: Polaganje[] = [];
  studentId = 1; // TODO: preuzmi iz tokena kasnije

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.ucitajIstoriju();
  }

  ucitajIstoriju(): void {
    this.studentService.getIstorija(this.studentId).subscribe({
      next: data => this.polaganja = data,
      error: err => console.error(err)
    });
  }
}
