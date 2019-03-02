import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FotografarPage } from '../fotografar/fotografar';
import { SincronizarPage } from '../sincronizar/sincronizar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
      public navCtrl: NavController
  ) { }

  goToFotografar(params){
    if (!params) params = {};
    this.navCtrl.push(FotografarPage);
  }

  goToSincronizar(params){
    if (!params) params = {};
    this.navCtrl.push(SincronizarPage);
  }

}
