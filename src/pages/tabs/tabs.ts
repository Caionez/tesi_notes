import { NotasPage } from './../notas/notas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotasPage;
  tab1Params = {tipoNota: 'notas'};
  tab2Root = NotasPage;
  tab2Params = {tipoNota: 'notas-secretas'};
  tab3Root = NotasPage;
  tab3Params = {tipoNota: 'notas-arquivadas'};
  
  constructor(public navCtrl: NavController) {
  }
}
