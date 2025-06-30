import { Component, Input } from '@angular/core';
import { Univerzitet } from '../model/univerzitet';
import { UniverzitetService } from '../services/univezitet.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-univerzitet',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './univerzitet.component.html',
  styleUrl: './univerzitet.component.css'
})
export class UniverzitetComponent {
  univerzitet?: Univerzitet;

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() backgroundUrl!: string;

  constructor(
    private univerzitetService: UniverzitetService
  ) { }

  ngOnInit(): void {
    this.univerzitetService.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.univerzitet = data[0]
        } 
      }, error: (err) => console.error("Greška pri učitavanju univerziteta: ", err)
    });
  }
}
