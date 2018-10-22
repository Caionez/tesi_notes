import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';
import { EditarNotaPage } from '../editar-nota/editar-nota';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';

@Component({
  selector: 'page-notas-secretas',
  templateUrl: 'notas-secretas.html'
})
export class NotasSecretasPage {
  notas: any[];

  constructor(public navCtrl: NavController, private androidFAuth: AndroidFingerprintAuth, public notasService: NotasService) {    
  }

  ionViewCanEnter(): Promise<any> {
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
            resolve(true);
          }
        })
        .catch(error => {console.error(error); resolve(true);});
    });
  }

  ionViewWillEnter() {    
    this.notasService.getNotas('notas-secretas').then(result => {
      this.notas = result;
    });
  }

  selecionaNota(codigo: number) {
    this.navCtrl.push(EditarNotaPage, { codigoNota: codigo, nomeStorage: 'notas-secretas' });
  }

  novaNotaSecreta() {
    this.navCtrl.push(EditarNotaPage, { codigoNota: 0, nomeStorage: 'notas-secretas' });
  }
}
