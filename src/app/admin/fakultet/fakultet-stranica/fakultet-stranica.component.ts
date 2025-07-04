import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FakultetFormaComponent } from '../fakultet-forma/fakultet-forma.component';
import { Fakultet } from '../../../model/fakultet';
import { MenuToggleService } from '../../../services/menu-toggle.service';
import { FakultetTabelaComponent } from '../fakultet-tabela/fakultet-tabela.component';

@Component({
  selector: 'app-fakultet-stranica',
  standalone: true,
  imports: [CommonModule, FakultetTabelaComponent, FakultetFormaComponent],
  templateUrl: './fakultet-stranica.component.html',
  styleUrl: './fakultet-stranica.component.css'
})
export class FakultetStranicaComponent {
  @Input() fakulteti: Fakultet[] = []
  fakultetZaIzmenu?: Fakultet;

  constructor(
    private menuToggleService: MenuToggleService,
  ) { }

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }
  
  odabraniFakultetZaIzmenu(fakultet: Fakultet): void {
    this.fakultetZaIzmenu = fakultet;
  }
}
