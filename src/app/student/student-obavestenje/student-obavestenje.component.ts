import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Obavestenje } from '../../model/obavestenje';

@Component({
  selector: 'app-student-obavestenje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-obavestenje.component.html',
  styleUrls: ['./student-obavestenje.component.css']
})
export class StudentObavestenjeComponent implements OnInit {

  obavestenja: Obavestenje[] = [];
  studentId = 1; // TODO: preuzmi iz tokena kasnije

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.ucitajObavestenja();
  }

  ucitajObavestenja(): void {
    this.studentService.getObavestenja(this.studentId).subscribe({
      next: data => this.obavestenja = data,
      error: err => console.error(err)
    });
  }
}
