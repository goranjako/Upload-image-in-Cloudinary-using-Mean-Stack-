import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { AddphotoComponent } from './addphoto/addphoto.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GalleryComponent,
    AddphotoComponent,
  

  ],
  imports: [
    CommonModule,
    GalleryRoutingModule, FormsModule,ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),NgxSpinnerModule,SweetAlert2Module
  ]
})
export class GalleryModule { }
