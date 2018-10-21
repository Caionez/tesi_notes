import { Component } from '@angular/core';

import { NotasSecretasPage } from '../notas-secretas/notas-secretas';
import { NotasPage } from '../notas/notas';
import { NavController, FabContainer } from 'ionic-angular';
import { EditarNotaPage } from '../editar-nota/editar-nota';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotasPage;
  tab2Root = NotasSecretasPage;

  constructor(public navCtrl: NavController) {

  }

  navegarEdicaoNota(secreta: boolean, fab: FabContainer) {
    fab.close();
    this.navCtrl.push(EditarNotaPage, { codigoNota: 0, notaSecreta: secreta });
  }
}
