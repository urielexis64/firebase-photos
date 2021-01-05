import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UploadImagesService {
  private IMAGES_FOLDER = 'img';

  constructor(private db: AngularFirestore) {}
  private saveImage(image: any) {
    this.db.collection(`/${this.IMAGES_FOLDER}`).add(image);
  }
}
