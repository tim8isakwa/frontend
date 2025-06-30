import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FakultetService } from '../services/fakultet.service';
import { Fakultet } from '../model/fakultet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = "Univerzitet Novi Sad"
  @Input() subtitle: string = "";
  @Input() backgroundUrl: string = '/assets/images/bkg1.jpg';
 
  fakulteti: Fakultet[] = [];
  jePrijavljen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fakultetService: FakultetService
  ) { }

  ngOnInit() {
    this.ucitajFakultete();
    this.jePrijavljen = this.authService.isLoggedIn();
  }

  ucitajFakultete() {
    this.fakultetService.getAll().subscribe({
      next: data => this.fakulteti = data,
      error: err => console.error("Greška pri učitavanju fakulteta: ", err)
    });
  }

  odjaviSe() {
    this.authService.logout();
    this.jePrijavljen = false;
    this.router.navigate(['/univerzitet']);
  }
}
