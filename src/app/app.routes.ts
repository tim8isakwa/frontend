import { Routes } from '@angular/router';
import { PrijavaComponent } from './registrovani-korisnik/prijava/prijava.component';
import { RegistracijaComponent } from './registrovani-korisnik/registracija/registracija.component';
import { IzmenaComponent } from './registrovani-korisnik/izmena/izmena.component';
import { authGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UniverzitetComponent } from './univerzitet/univerzitet.component';

export const routes: Routes = [
    { path: '', redirectTo: 'univerzitet', pathMatch: 'full' },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'registracija', component: RegistracijaComponent},
    { path: 'izmeni', component: IzmenaComponent },
    { path: 'univerzitet', component: UniverzitetComponent },
    { 
        path: 'admin-dashboard', component: AdminDashboardComponent,
        children: [
            { path: '', redirectTo: 'aktivacija', pathMatch: 'full' },
        ],
        data: { requiredRoles: ["ROLE_ADMIN"] }, canActivate: [authGuard]
    },
   { path: 'homepage', component: HomepageComponent },
];
