import { Component } from '@angular/core';

import { NotasPage } from '../notas/notas';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotasPage;
  tab1Params = {autenticar: false};
  tab2Root = NotasPage;
  tab2Params = {autenticar: true};
  
  constructor(public navCtrl: NavController) {
  }
}
