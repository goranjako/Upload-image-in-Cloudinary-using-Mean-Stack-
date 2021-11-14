import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Sweetalert2Service } from '../shared/swal.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  apiURL;
  constructor(private http: HttpClient, private toast: Sweetalert2Service) {
    this.apiURL = environment.api;}

    add(data:any): Observable<any> {
      return this.http.post<any>(this.apiURL +'/image', data);
    }

    getPhotos(id:any): Observable<any> {
      return this.http.get<any>(this.apiURL +'/image' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }
    
    deletePhoto(id:any): Observable<any> {
      return this.http.delete<any>(this.apiURL +'/image' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }


    errorHandl(error: { error: string; status: any; message: any; }) {
      let errorMessage = '';
      if (error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
