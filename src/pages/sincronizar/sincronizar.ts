import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import {File} from "@ionic-native/file";
/*import {WebView} from "@ionic-native/ionic-webview/ngx";*/

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'page-sincronizar',
  templateUrl: 'sincronizar.html'
})
export class SincronizarPage {

  images = [];

  constructor(
      public navCtrl: NavController,
      private storage: Storage,
      private platform: Platform
      // private file: File,
      /*private webview: WebView,*/
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  /*pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }*/

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          this.images.push({ path: img });
        }
      }
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
    });
  }

}
