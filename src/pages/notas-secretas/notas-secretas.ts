import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';

@Component({
  selector: 'page-notas-secretas',
  templateUrl: 'notas-secretas.html'
})
export class NotasSecretasPage {
  notas: any[];

  constructor(public navCtrl: NavController, public notasService: NotasService) {
    this.notas = notasService.getNotas();
  }

}
