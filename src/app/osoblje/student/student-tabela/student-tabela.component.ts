import { Component } from '@angular/core';
import { Student } from '../../../model/student';
import { StudentService } from '../../../services/student.service';
import { MenuToggleService } from '../../../services/menu-toggle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-tabela',
  templateUrl: './student-tabela.component.html',
  styleUrls: ['./student-tabela.component.css'],
  imports: [CommonModule]
})
export class StudentTabelaComponent {
   studenti: Student[] = [];
 
   constructor(
     private menuToggleService: MenuToggleService,
     private studentService: StudentService
   ) { }
 
   onSomeAction() {
     this.menuToggleService.toggleMenu();
   }
 
   ngOnInit() {
     this.ucitajStudente();
   }
 
   ucitajStudente(): void {
     this.studentService.getAll().subscribe({
       next: (data) => this.studenti = data,
       error: (err) => console.error("Greška pri učitavanju studenata: ", err)
     });
   }
}
