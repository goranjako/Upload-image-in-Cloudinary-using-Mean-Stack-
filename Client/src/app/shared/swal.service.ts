import { Injectable } from '@angular/core';
import Swal from  'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor( ) { }

  alert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    }


    show(typee: any, text: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 4000,
        width: 400

      });
      Toast.fire({
        icon: typee,
        title: text
      });
    }

}





