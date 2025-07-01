import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudijskiProgram } from '../../../model/studijskiProgram';
import { StudijskiProgramFormaComponent } from '../studijski-program-forma/studijski-program-forma.component';
import { StudijskiProgramTabelaComponent } from '../studijski-program-tabela/studijski-program-tabela.component';
import { MenuToggleService } from '../../../services/menu-toggle.service';

@Component({
  selector: 'app-studijski-program-stranica',
  imports: [
    CommonModule,
    StudijskiProgramTabelaComponent,
    StudijskiProgramFormaComponent
  ],
  templateUrl: './studijski-program-stranica.component.html',
  styleUrls: ['./studijski-program-stranica.component.css']
})

export class StudijskiProgramStranicaComponent {
  studijskiProgrami: StudijskiProgram[] = [];
  programZaIzmenu?: StudijskiProgram;

  constructor(private menuToggleService: MenuToggleService) {}

  onSomeAction(): void {
    this.menuToggleService.toggleMenu();
  }

  odabraniProgramZaIzmenu(program: StudijskiProgram): void {
    this.programZaIzmenu = program;
  }
}
