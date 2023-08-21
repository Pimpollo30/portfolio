import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SocialMediaComponent } from './pages/social-media/social-media.component';
import { ExperienciaComponent } from './pages/experiencia/experiencia.component';
import { NotasComponent } from './pages/notas/notas.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CrudNotasComponent } from './pages/crud-notas/crud-notas.component';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { VerNotasComponent } from './pages/ver-notas/ver-notas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SocialMediaComponent,
    ExperienciaComponent,
    NotasComponent,
    LoginComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    CrudNotasComponent,
    VerNotasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
