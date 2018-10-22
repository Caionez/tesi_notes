import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { MyApp } from './app.component';

import { EditarNotaPage } from '../pages/editar-nota/editar-nota';
import { NotasPage } from '../pages/notas/notas';
import { NotasSecretasPage } from '../pages/notas-secretas/notas-secretas';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotasService } from '../providers/notas-service';

@NgModule({
  declarations: [
    MyApp,
    NotasSecretasPage,
    EditarNotaPage,
    NotasPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotasSecretasPage,
    EditarNotaPage,
    NotasPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotasService,
    AndroidFingerprintAuth
  ]
})
export class AppModule {}
