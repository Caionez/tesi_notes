import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'editar-nota.html'
})
export class EditarNotaPage {
  nota: { codigo: number, titulo: string, texto: string, cor: string };

  notaSecreta: boolean;

  constructor(public navCtrl: NavController, public paramsCtrl: NavParams) {

    this.notaSecreta = paramsCtrl.get("notaSecreta");
    let notaEditar = paramsCtrl.get("nota");

    if (!notaEditar)
      this.nota = { codigo: 0, titulo: undefined, texto: undefined, cor: "default" };
    else this.nota = notaEditar;
  }
}
