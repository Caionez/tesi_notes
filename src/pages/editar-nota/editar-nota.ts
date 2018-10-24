import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotasService } from '../../providers/notas-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'editar-nota.html'
})
export class EditarNotaPage {

  codigoNota: number;
  tituloNota: string;
  textoNota: string;
  corNota: string;

  nomeStorage: string;

  constructor(public navCtrl: NavController, public paramsCtrl: NavParams, public notasSvc: NotasService) {

    this.nomeStorage = paramsCtrl.get("nomeStorage");
    let codigoNota: number = paramsCtrl.get("codigoNota");

    if (codigoNota != 0) {
      let nota = notasSvc.getNota(codigoNota);
      this.codigoNota = nota.codigo;
      this.tituloNota = nota.titulo;
      this.textoNota = nota.texto;
      this.corNota = nota.cor;

    } else {
      this.codigoNota = 0;
      this.tituloNota = "";
      this.textoNota = "";
      this.corNota = "default";
    }
  }

  salvarNota() {
    if (this.codigoNota == 0) {
      this.codigoNota = this.notasSvc.adicionarNota(this.tituloNota, this.textoNota, this.corNota, this.nomeStorage);
    } else {
      this.notasSvc.editarNota(this.codigoNota, this.tituloNota, this.textoNota, this.corNota, this.nomeStorage)
    }
    this.navCtrl.pop();
    //this.navCtrl.setRoot(NotasPage, {autenticar: false});
  }

  excluirNota() {
    this.notasSvc.excluirNota(this.codigoNota, this.nomeStorage);
    this.navCtrl.pop();
    //this.navCtrl.setRoot(NotasPage, {autenticar: false});
  }
}
