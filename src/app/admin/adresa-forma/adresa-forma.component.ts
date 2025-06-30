import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adresa-forma',
  imports: [],
  templateUrl: './adresa-forma.component.html',
  styleUrl: './adresa-forma.component.css'
})
export class AdresaFormaComponent {
  @Input() adresaForm!: FormGroup;

  isInvalid(controlName: string): boolean {
    const control = this.adresaForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
