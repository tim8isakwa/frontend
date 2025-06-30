import { Component } from '@angular/core';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-korisnik-tabela',
  imports: [CommonModule],
  templateUrl: './korisnik-tabela.component.html',
  styleUrl: './korisnik-tabela.component.css'
})
export class KorisnikTabelaComponent {
  korisnici: RegistrovaniKorisnik[] = [];

  constructor(
    private menuToggleService: MenuToggleService,
    private adminService: AdminService
  ) { }

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }

  ngOnInit() {
    this.ucitajKorisnike();
  }

  ucitajKorisnike(): void {
    this.adminService.getAllUsers().subscribe({
      next: (data) => this.korisnici = data,
      error: (err) => console.error("Greška pri učitavanju korisnika: ", err)
    });
  }
}
