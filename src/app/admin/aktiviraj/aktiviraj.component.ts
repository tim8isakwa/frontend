import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { AdminService } from '../../services/admin.service';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aktiviraj',
  imports: [CommonModule],
  templateUrl: './aktiviraj.component.html',
  styleUrl: './aktiviraj.component.css'
})
export class AktivirajComponent {
  korisnici: RegistrovaniKorisnik[] = [];

  constructor(
    private menuToggleService: MenuToggleService,
    private adminService: AdminService
  ) { 
     this.ucitajNeaktivneKorisnike();
  }

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }

  ucitajNeaktivneKorisnike(): void {
    this.adminService.getUsersByStatus(false).subscribe({
      next: (data) => this.korisnici = data,
      error: (err) => console.error("Greška pri učitavanju korisnika: ", err)
    });
  }

  aktiviraj(id: number): void {
    this.adminService.activateUser(id).subscribe({
      next: () => {
        this.ucitajNeaktivneKorisnike();
      },
      error: (err) => console.error("Greška pri aktiviranju korisnika: ", err)
    });
  }
}
