import { StatusBar } from "@ionic-native/status-bar";
import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  NavParams,
  AlertController
} from "ionic-angular";
import { NotasService } from "../../providers/notas-service";
import { EditarNotaPage } from "../editar-nota/editar-nota";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

@Component({
  selector: "page-notas",
  templateUrl: "notas.html"
})
export class NotasPage {
  autenticar: boolean;
  tipoNota: string;
  notas: any[];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private faio: FingerprintAIO,
    public paramsCtrl: NavParams,
    public notasService: NotasService,
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar
  ) {
    this.tipoNota = paramsCtrl.get("tipoNota");
    this.autenticar = this.tipoNota == "notas-secretas" ? true : false;
    statusBar.backgroundColorByHexString(
      this.autenticar ? "#222222" : "#488aff"
    );
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: "Carregando notas..."
    });
    loading.present();

    this.notasService.getNotas(this.tipoNota).then(result => {
      this.notas = result;
      loading.dismiss();
    });
  }

  ionViewCanEnter(): Promise<any> {
    if (this.autenticar) {
      return new Promise((resolve, reject) => {
        this.faio
          .isAvailable()
          .then(result => {
            if (result == "finger" || result == "face") {
              this.faio
                .show({ clientId: "tesi_notes", clientSecret: "tesi_notes" })
                .then(result => resolve(true), error => resolve(false));
            } else {
              console.log("acesso em dispositivo sem Fingerprint");
              const alert = this.alertCtrl.create({
                title: "Cordova não disponível",
                subTitle:
                  "Não foi possível localizar o sensor de Impressões Digitais do dispositivo.\nAcesso concedido para testes.",
                buttons: [
                  {
                    text: "OK",
                    handler: () => {
                      resolve(true);
                    }
                  }
                ]
              });
              alert.present();
              resolve(true);
            }
          })
          .catch(error => {
            console.error(error);
            const alert = this.alertCtrl.create({
              title: "Cordova não disponível",
              subTitle:
                "Não foi possível localizar o sensor de Impressões Digitais do dispositivo.\nAcesso concedido para testes.",
              buttons: [
                {
                  text: "OK",
                  handler: () => {
                    resolve(true);
                  }
                }
              ]
            });
            alert.present();
            resolve(true);
          });
      });
    } else return new Promise(resolve => resolve(true));
  }

  selecionaNota(codigo: number) {
    this.navCtrl.push(EditarNotaPage, {
      codigoNota: codigo,
      nomeStorage: this.tipoNota
    });
  }

  novaNota() {
    this.navCtrl.push(EditarNotaPage, {
      codigoNota: 0,
      nomeStorage: this.tipoNota
    });
  }
}
