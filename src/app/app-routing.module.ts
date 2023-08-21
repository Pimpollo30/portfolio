import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExperienciaComponent } from './pages/experiencia/experiencia.component';
import { NotasComponent } from './pages/notas/notas.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CrudNotasComponent } from './pages/crud-notas/crud-notas.component';
import { AuthGuard } from './auth.guard';
import { VerNotasComponent } from './pages/ver-notas/ver-notas.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch:'full'},
  { path: '', component: MainLayoutComponent, 
  children: [
    { path: 'inicio', component: HomeComponent},
    { path: 'experiencia', component: ExperienciaComponent},
    { path: 'notas', component: NotasComponent},
    { path: 'notas/:id', component: VerNotasComponent},
  ]},

  { path: '', component: LoginLayoutComponent, 
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'crud-notas', component: CrudNotasComponent, canActivate:[AuthGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
