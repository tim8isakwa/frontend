import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zvanje-forma',
  imports: [],
  templateUrl: './zvanje-forma.component.html',
  styleUrls: ['./zvanje-forma.component.css']
})
export class ZvanjeFormaComponent {
  @Input() zvanjeForm!: FormGroup;

  isInvalid(controlName: string): boolean {
    const control = this.zvanjeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
