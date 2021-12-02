import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GalleryService } from './gallery.service';

export interface Gall {
   src:string;
    caption:string;
     thumb:string;
}
// install Swiper modules


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  album: Gall[]= [];
  user: any;

  items: Observable<any[]> | any;
  constructor(private gallery: GalleryService,private servis : AuthService, private _lightbox: Lightbox) {

  }

  ngOnInit() {
    this.getUser();
    this.getPhotos();

  }
   //get_user
   getUser() {
    this.user = this.servis.getToken();
    return this.user;
  }
  getPhotos() {
    this.items= this.gallery.getPhotos(this.user._id);
  return this.items;
  }

 pp(){
   /*
   this.album= [
     {src:this.items.image,caption: this.items.title,thumb:this.items.image}

   ]
   console.log(this.album)
   return this.album;
   */
 }
 slike(photo:any){
  for (let i = 1; i <= 4; i++) {
     const src=photo.image;
    const caption = photo.title;
    const thumb = photo.image;
    const albums = {
       src:src,
       caption: caption,
       thumb: thumb
    };
    this.album.push(albums);
   return  this._lightbox.open(this.album,1);
  }
}

/*
 for(const photo of this.slike ){

    photoUrl.push(
      {
        image: photo.image,
        thumbImage: photo.image,
        title: 'Slider 5',
        alt: 'Hello World 5'
      }
    );
  }
   return photoUrl;
  }

*/




  trackBy(index: number, item: any){
    return item;
  }

  open(item:any) {



    // open lightbox
    this._lightbox.open(this.album);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}


function photo(photo: any) {
  throw new Error('Function not implemented.');
}

