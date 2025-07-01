import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudijskiProgram } from '../../../model/studijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';

@Component({
  selector: 'app-studijski-program-tabela',
  imports: [],
  templateUrl: './studijski-program-tabela.component.html',
  styleUrl: './studijski-program-tabela.component.css'
})
export class StudijskiProgramTabelaComponent {
  @Input()
  programi: StudijskiProgram[] = [];
  @Output() 
  programZaIzmenu: EventEmitter<StudijskiProgram> = new EventEmitter<StudijskiProgram>();

  constructor(private programService: StudijskiProgramService) {
    this.ucitajStudijskePrograme();
  }

  ucitajStudijskePrograme(): void {
    this.programService.getAll().subscribe({
      next: (data) => this.programi = data,
      error: (err) => console.error('Greška pri učitavanju programa:', err)
    }) 
  }

  izmeni(program: StudijskiProgram): void {
    this.programZaIzmenu.emit(program); 
  }

  izbrisi(id: number): void {
    this.programService.delete(id).subscribe({
      next: () => this.ucitajStudijskePrograme(),
      error: (err) => console.error('Greška pri brisanju programa:', err)
    }); 
  }
}
