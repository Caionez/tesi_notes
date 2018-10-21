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

  notaSecreta: boolean;

  constructor(public navCtrl: NavController, public paramsCtrl: NavParams, public notasSvc: NotasService) {

    this.notaSecreta = paramsCtrl.get("notaSecreta");
    let codigoNota: number = paramsCtrl.get("codigoNota");

    if (codigoNota != 0) {
      //if notaSecreta...
      let nota = notasSvc.getNota(codigoNota);

      this.codigoNota = nota.codigo;
      this.tituloNota = nota.titulo;
      this.textoNota = nota.texto;
      this.corNota = nota.cor;

    } 
    else {
      //this.nota = { codigo: 0, titulo: undefined, texto: undefined, cor: "default" };
      this.codigoNota = 0;
      this.tituloNota = "";
      this.textoNota = "";
      this.corNota = "default";
    }
  }

  salvarNota() {
    if (this.codigoNota == 0) {
      this.codigoNota = this.notasSvc.adicionarNota(this.tituloNota, this.textoNota, this.corNota);
    } else {
      this.notasSvc.editarNota(this.codigoNota, this.tituloNota, this.textoNota, this.corNota)
    }
    this.navCtrl.pop();
  }

  excluirNota() {
    this.notasSvc.excluirNota(this.codigoNota);
    this.navCtrl.pop();
  }
}
