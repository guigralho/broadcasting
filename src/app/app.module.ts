import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FotografarPage } from '../pages/fotografar/fotografar';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {HttpClientModule} from "@angular/common/http";

import {WebView} from "@ionic-native/ionic-webview/ngx";
import {FilePath} from "@ionic-native/file-path";

import {IonicStorageModule} from "@ionic/storage";
import {Camera} from "@ionic-native/camera";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        FotografarPage,
        SincronizarPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        FotografarPage,
        SincronizarPage
    ],
    providers: [
        Camera,
        WebView,
        FilePath,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {}
