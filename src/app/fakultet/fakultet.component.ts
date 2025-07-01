import { Component, Input } from '@angular/core';
import { Fakultet } from '../model/fakultet';
import { FakultetService } from '../services/fakultet.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-fakultet',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './fakultet.component.html',
  styleUrl: './fakultet.component.css'
})
export class FakultetComponent {
  fakultet?: Fakultet;

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() backgroundUrl!: string;

  constructor(private fakultetService: FakultetService) { }

   ngOnInit(): void {
    this.fakultetService.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.fakultet = data[0]
        } 
      }, error: (err) => console.error("Greška pri učitavanju fakulteta: ", err)
    });
  }
  goBack() {
  window.history.back();
}

}