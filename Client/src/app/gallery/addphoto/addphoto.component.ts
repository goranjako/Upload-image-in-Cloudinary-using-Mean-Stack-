import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { Gallery } from '../gallery';
import {GalleryService} from '../gallery.service';


@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.scss']
})
export class AddphotoComponent implements OnInit {


  imgFile:any;
  validationForm!: FormGroup;


 constructor(private router: Router, private toast: Sweetalert2Service, private add:GalleryService , private loading: NgxSpinnerService
      ) {
    }
      ngOnInit() {
        this.validationForm = new FormGroup({
          file: new FormControl('', Validators.compose([
            Validators.required
          ])),

          title: new FormControl('',  Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25)
          ]))
        });
       }
      get file() { return this.validationForm.get('file'); }
      get title() { return this.validationForm.get('title'); }

      //image preview
      onImageChange(e:any) {
        const reader = new FileReader();

        if(e.target.files && e.target.files.length) {
          const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imgFile = reader.result as string;
            this.validationForm.patchValue({
              imgSrc: reader.result
            });

          };
        }
      }


  onSubmit(f: any) {
    this.loading.show();
    const formData: FormData = new FormData();
    formData.append('photo', this.imgFile);
    formData.append('title', f.title);

     this.add.add(formData).subscribe(
      res => {
        this.loading.hide();
        this.toast.show('success', res.message);
        this.router.navigate(['/gallery']);
        this.validationForm.reset();

      },
   error => {
        this.validationForm.reset();
        this.imgFile="";
        this.toast.show('warning', error.message);
        this.loading.hide();
  }
  );
  }

}
