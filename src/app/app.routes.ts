import { Routes } from '@angular/router';
import { PrijavaComponent } from './registrovani-korisnik/prijava/prijava.component';
import { RegistracijaComponent } from './registrovani-korisnik/registracija/registracija.component';
import { IzmenaComponent } from './registrovani-korisnik/izmena/izmena.component';
import { authGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UniverzitetComponent } from './univerzitet/univerzitet.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentPregledComponent } from './student/student-pregled/student-pregled.component';
import { StudentIstorijaComponent } from './student/student-istorija/student-istorija.component';
import { StudentObavestenjeComponent } from './student/student-obavestenje/student-obavestenje.component';
import { StudentPrijavaComponent } from './student/student-prijava/student-prijava.component';

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
    { 
        path: 'student-dashboard', component: StudentDashboardComponent,
        children: [
            { path: '', redirectTo: 'pregled', pathMatch: 'full' },
            { path: 'pregled', component: StudentPregledComponent },
            { path: 'prijava', component: StudentPrijavaComponent },
            { path: 'istorija', component: StudentIstorijaComponent },
            { path: 'obavestenja', component: StudentObavestenjeComponent },
        ],
        data: { requiredRoles: ["ROLE_STUDENT"] }, canActivate: [authGuard]
    },
   { path: 'homepage', component: HomepageComponent },
];
