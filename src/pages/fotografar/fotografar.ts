import {/*ChangeDetectorRef,*/ Component} from '@angular/core';
import {ActionSheetController, NavController, Platform, ToastController, normalizeURL} from 'ionic-angular';
import {Camera, CameraOptions, PictureSourceType} from "@ionic-native/camera";
/*import {FilePath} from "@ionic-native/file-path";
import {WebView} from "@ionic-native/ionic-webview/ngx";
import { File } from '@ionic-native/file';*/
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'page-fotografar',
  templateUrl: 'fotografar.html'
})
export class FotografarPage {

  path: string;

  images = [];

  constructor(
      public navCtrl: NavController,
      private actionSheetController: ActionSheetController,
      private camera: Camera,
      private platform: Platform,
      // private filePath: FilePath,
      // private webview: WebView,
      // private file: File,
      private toastController: ToastController,
      private storage: Storage,
      // private ref: ChangeDetectorRef,
  ) { }

  /*pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }*/

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 100,
      targetHeight: 100,
    };


    this.platform.ready().then(() => {
      this.camera.getPicture(options).then(imagePath => {
        console.log(imagePath);

        this.path = normalizeURL(imagePath);
        this.updateStoredImages(this.path);
        /*if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }*/
      });
    });

    this.camera.cleanup();
  }

  /*createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }*/

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      /*let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle*/
    });
  }
  
}
