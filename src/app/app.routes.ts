import { Routes } from '@angular/router';
import { PrijavaComponent } from './registrovani-korisnik/prijava/prijava.component';
import { RegistracijaComponent } from './registrovani-korisnik/registracija/registracija.component';
import { IzmenaComponent } from './registrovani-korisnik/izmena/izmena.component';
import { authGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UniverzitetComponent } from './univerzitet/univerzitet.component';
import { AktivirajComponent } from './admin/aktiviraj/aktiviraj.component';
import { FakultetStranicaComponent } from './admin/fakultet/fakultet-stranica/fakultet-stranica.component';
import { UniverzitetFormaComponent } from './admin/univerzitet/univerzitet-forma/univerzitet-forma.component';
import { StudijskiProgramStranicaComponent } from './admin/studijski-program/studijski-program-stranica/studijski-program-stranica.component';
import { StudijskiProgramComponent } from './studijski-program/studijski-program.component';
import { FakultetComponent } from './fakultet/fakultet.component';
import { OsobljeDashboardComponent } from './osoblje/osoblje-dashboard/osoblje-dashboard.component';
import { StudentFormaComponent } from './osoblje/student/student-forma/student-forma.component';
import { StudentTabelaComponent } from './osoblje/student/student-tabela/student-tabela.component';

export const routes: Routes = [
    { path: '', redirectTo: 'univerzitet', pathMatch: 'full' },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'registracija', component: RegistracijaComponent},
    { path: 'izmeni', component: IzmenaComponent },
    { path: 'univerzitet', component: UniverzitetComponent },
    { path: 'fakulteti/:id', component: FakultetComponent },
    { path: 'studijskiProgrami/:id', component: StudijskiProgramComponent},
    { 
        path: 'admin-dashboard', component: AdminDashboardComponent,
        children: [
            { path: '', redirectTo: 'aktiviraj', pathMatch: 'full' },
            { path: 'aktiviraj', component: AktivirajComponent},
            { path: 'univerzitet-forma', component: UniverzitetFormaComponent },
            { path: 'fakultet-stranica', component: FakultetStranicaComponent },
            { path: 'program-stranica', component: StudijskiProgramStranicaComponent },
        ],
        data: { requiredRoles: ["ROLE_ADMIN"] }, canActivate: [authGuard]
    },
    { path: 'homepage', component: HomepageComponent },
    { 
        path: 'osoblje-dashboard', component: OsobljeDashboardComponent,
        children: [
            { path: '', redirectTo: 'student-tabela', pathMatch: 'full' },
            { path: 'student-forma', component: StudentFormaComponent },
            { path: 'student-tabela', component: StudentTabelaComponent },
        ],
        data: { requiredRoles: ["ROLE_OSOBLJE"] }, canActivate: [authGuard]
    }
];
