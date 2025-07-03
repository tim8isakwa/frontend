import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-adresa-forma',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
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
