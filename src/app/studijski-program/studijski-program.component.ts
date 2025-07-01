import { Component, Input } from '@angular/core';
import { StudijskiProgram } from '../model/studijskiProgram';
import { StudijskiProgramService } from '../services/studijski-program.service';

@Component({
  selector: 'app-studijski-program',
  imports: [],
  templateUrl: './studijski-program.component.html',
  styleUrl: './studijski-program.component.css'
})
export class StudijskiProgramComponent {
  program?: StudijskiProgram;

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() backgroundUrl!: string;

  constructor(private programService: StudijskiProgramService) { }

   ngOnInit(): void {
    this.programService.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.program = data[0]
        } 
      }, error: (err) => console.error("Greška pri učitavanju studijskog programa: ", err)
    });
  }
}
