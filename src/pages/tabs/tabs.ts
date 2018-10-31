import { NotasPage } from "./../notas/notas";
import { Component, ViewChild } from "@angular/core";
import { NavController, Tab, Tabs } from "ionic-angular";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  @ViewChild("tabs")
  objTabs: Tabs;

  tab1Root = NotasPage;
  tab1Params = { tipoNota: "notas" };
  tab2Root = NotasPage;
  tab2Params = { tipoNota: "notas-secretas" };
  tab3Root = NotasPage;
  tab3Params = { tipoNota: "notas-arquivadas" };

  constructor(public navCtrl: NavController) {}

  tabSelected(tab: Tab) {
    switch (tab.index) {
      case 0:
      case 2:
        this.objTabs.color = "primary";
        break;
      case 1:
        this.objTabs.color = "dark";
        break;
    }
  }
}
