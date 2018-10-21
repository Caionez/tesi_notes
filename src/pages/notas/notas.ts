import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';
import { EditarNotaPage } from '../editar-nota/editar-nota';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {

  notas: any[];

  constructor(public navCtrl: NavController, public notasService: NotasService) {
    this.notas = notasService.getNotas();
  }

  selecionaNota(codigo: number) {
    this.navCtrl.push(EditarNotaPage, {codigoNota: codigo, notaSecreta: false});
  }

}
