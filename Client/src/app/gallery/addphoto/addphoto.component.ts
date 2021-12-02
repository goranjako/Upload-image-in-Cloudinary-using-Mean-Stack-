import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { Gallery } from '../gallery';
import { AuthService } from '../../auth/auth.service';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.scss'],
})
export class AddphotoComponent implements OnInit {
  user: any;
  imageUrl: any;
  imgFile: any;
  validationForm!: FormGroup;

  constructor(
    private router: Router,
    private toast: Sweetalert2Service,
    private add: GalleryService,
    private loading: NgxSpinnerService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.getUser();
    this.validationForm = new FormGroup({
      file: new FormControl(null, Validators.compose([Validators.required])),

      title: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ])
      ),
    });
  }
  //get
  get file() {
    return this.validationForm.get('file');
  }
  get title() {
    return this.validationForm.get('title');
  }

  //get_user
  getUser() {
    this.user = this.auth.getToken();
  }
//onChange_button
  onChange(event: any) {
    this.imgFile = event.target.files[0];
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }
//onSubmit
  onSubmit(f: any) {
    this.loading.show();
    const formData = new FormData();
    formData.append('id', this.user._id);
    formData.append('image', this.imgFile);
    formData.append('title', f.title);

    this.add.add(formData).subscribe(
      (data: Gallery) => {
        this.loading.hide();
        this.toast.show('success', data.msg);
        this.router.navigate(['/gallery']);
        this.validationForm.reset();
      },
      (error) => {
        this.validationForm.reset();
        this.imgFile = '';
        this.toast.show('warning', error.message);
        this.loading.hide();
      }
    );
  }
}
