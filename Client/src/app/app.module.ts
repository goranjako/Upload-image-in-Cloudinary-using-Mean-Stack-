import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './index/navbar/navbar.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { Interceptor } from './auth/interceptor';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    NotFoundComponent,
    RegisterComponent,
    LoginComponent

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
     NgxSpinnerModule, MDBBootstrapModule.forRoot(), SweetAlert2Module.forRoot(),
    FormsModule, ReactiveFormsModule, HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },

      }
    })
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
