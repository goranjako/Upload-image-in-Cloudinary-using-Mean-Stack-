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


    show(typee:any, msg:any) {
       Swal.fire({
        position: 'center',
        showConfirmButton: false,
        timer: 4000,
        width: 400,
        icon: typee,
        title: msg

      });

    }

}





