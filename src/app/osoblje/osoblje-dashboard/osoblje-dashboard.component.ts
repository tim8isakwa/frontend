import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { RouterOutlet } from '@angular/router';
import { OsobljeMenuComponent } from '../osoblje-menu/osoblje-menu.component';

@Component({
  selector: 'app-osoblje-dashboard',
  imports: [RouterOutlet, OsobljeMenuComponent],
  templateUrl: './osoblje-dashboard.component.html',
  styleUrl: './osoblje-dashboard.component.css'
})
export class OsobljeDashboardComponent implements OnInit {
  isMenuCollapsed: boolean = false;

  constructor(private menuToggleService: MenuToggleService) { }

  ngOnInit() {
    this.menuToggleService.isMenuCollapsed$.subscribe(collapsed => {
      this.isMenuCollapsed = collapsed;
    })
  }
  
  toggleMenu() {
    this.menuToggleService.toggleMenu()
  }
}
