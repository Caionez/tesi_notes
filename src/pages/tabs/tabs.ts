import { Component } from '@angular/core';

//import { NotasSecretasPage } from '../notas-secretas/notas-secretas';
import { NotasPage } from '../notas/notas';
import { NavController, FabContainer } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotasPage;
  tab1Params = {tipoNota: 'notas'};
  tab2Root = NotasPage;
  tab2Params = {tipoNota: 'notas-secretas'};
  //tab2Root = NotasSecretasPage;

  constructor(public navCtrl: NavController) {
  }
}
