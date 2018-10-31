import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";
import { MyApp } from "./app.component";

import { EditarNotaPage } from "../pages/editar-nota/editar-nota";
import { NotasPage } from "../pages/notas/notas";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { NotasService } from "../providers/notas-service";

@NgModule({
  declarations: [MyApp, EditarNotaPage, NotasPage, TabsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, EditarNotaPage, NotasPage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotasService,
    FingerprintAIO
  ]
})
export class AppModule {}
