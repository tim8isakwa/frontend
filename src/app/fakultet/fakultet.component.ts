import { Component, Input } from '@angular/core';
import { Fakultet } from '../model/fakultet';
import { FakultetService } from '../services/fakultet.service';

@Component({
  selector: 'app-fakultet',
  imports: [],
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
}