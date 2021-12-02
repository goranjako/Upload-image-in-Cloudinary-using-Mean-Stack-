
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Interceptor } from '../auth/interceptor';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    GalleryComponent,
    AddphotoComponent,


  ],
  imports: [
    OverlayModule,NgxGalleryModule,LightboxModule,
    HttpClientModule,NgImageSliderModule,
    CommonModule,
    GalleryRoutingModule, FormsModule,ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),NgxSpinnerModule,SweetAlert2Module
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GalleryModule { }
