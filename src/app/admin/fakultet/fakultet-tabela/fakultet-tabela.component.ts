import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fakultet } from '../../../model/fakultet';
import { FakultetService } from '../../../services/fakultet.service';

@Component({
  selector: 'app-fakultet-tabela',
  imports: [CommonModule],
  templateUrl: './fakultet-tabela.component.html',
  styleUrl: './fakultet-tabela.component.css'
})
export class FakultetTabelaComponent {
  @Input()
  fakulteti: Fakultet[] = [];
  @Output() 
  fakultetZaIzmenu: EventEmitter<Fakultet> = new EventEmitter<Fakultet>();

  constructor(private fakultetService: FakultetService) { 
    this.ucitajFakultet();
  }

  ucitajFakultet(): void {
    this.fakultetService.getAll().subscribe({
      next: (data) => this.fakulteti = data,
      error: (err) => console.error('Greška pri učitavanju fakulteta:', err)
    }) 
  }

  izmeni(fakultet: Fakultet): void{
    this.fakultetZaIzmenu.emit(fakultet);
  }

  izbrisi(id: number): void {
    this.fakultetService.delete(id).subscribe({
      next: () => this.ucitajFakultet(),
      error: (err) => console.error('Greška pri brisanju fakulteta:', err)
    })
  }
}
