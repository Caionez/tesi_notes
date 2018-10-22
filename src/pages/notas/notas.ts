import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';
import { EditarNotaPage } from '../editar-nota/editar-nota';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {

  notas: any[];

  constructor(public navCtrl: NavController, public notasService: NotasService, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando notas...'
    });
    loading.present();

    this.notasService.getNotas('notas').then(result => {
      this.notas = result;
      loading.dismiss();
    });
  }

  selecionaNota(codigo: number) {
    this.navCtrl.push(EditarNotaPage, { codigoNota: codigo, nomeStorage: 'notas' });
  }

  novaNota() {
    this.navCtrl.push(EditarNotaPage, { codigoNota: 0, nomeStorage: 'notas' });
  }
}
