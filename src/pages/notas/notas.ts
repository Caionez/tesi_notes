import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';
import { EditarNotaPage } from '../editar-nota/editar-nota';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {
  tipoNota: string;
  notas: any[];

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private androidFAuth: AndroidFingerprintAuth, public paramsCtrl: NavParams, public notasService: NotasService, public loadingCtrl: LoadingController) {
    this.tipoNota = paramsCtrl.get('tipoNota');
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando notas...'
    });
    loading.present();

    this.notasService.getNotas(this.tipoNota).then(result => {
      this.notas = result;
      loading.dismiss();
    });
  }

  ionViewCanEnter(): Promise<any> {

    if (this.tipoNota == 'notas-secretas') {
      return new Promise((resolve, reject) => {
        this.androidFAuth.isAvailable()
          .then((result) => {
            if (result.isAvailable) {
              // it is available  
              this.androidFAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
                .then(result => {
                  if (result.withFingerprint) {
                    console.log('Successfully encrypted credentials.');
                    console.log('Encrypted credentials: ' + result.token);
                    resolve(true);
                  } else if (result.withBackup) {
                    console.log('Successfully authenticated with backup password!');
                    resolve(true);
                  } else console.log('Didn\'t authenticate!');
                })
                .catch(error => {
                  if (error === this.androidFAuth.ERRORS.FINGERPRINT_CANCELLED) {
                    console.log('Fingerprint authentication cancelled');
                  } else console.error(error)
                });

            } else {
              // fingerprint auth isn't available
              console.log('acesso em dispositivo sem Fingerprint');
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
            alert.present();resolve(true); });
      });
    } else return new Promise(resolve => resolve(true));
  }

  selecionaNota(codigo: number) {
    this.navCtrl.push(EditarNotaPage, { codigoNota: codigo, nomeStorage: this.tipoNota });
  }

  novaNota() {
    this.navCtrl.push(EditarNotaPage, { codigoNota: 0, nomeStorage: this.tipoNota });
  }
}
