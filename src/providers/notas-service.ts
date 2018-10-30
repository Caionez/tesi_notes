import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class NotasService {

  notas: any[];
  ultimoCodigo: number;

  constructor(private storage: Storage) {
    this.notas = [];
  }

  getNotas(nomeStorage: string) {
    return this.storage.get(nomeStorage)
      .then(result => {
        if (result != undefined && result != null) {
          this.notas = JSON.parse(result);
          if (this.notas.length > 0)
            this.ultimoCodigo = this.notas[this.notas.length - 1].codigo;
        }
        else {
          this.notas = [];
          this.ultimoCodigo = 0;
        }
        return this.notas;
      });
  }

  getNota(codigo: number): any {
    for (let i = 0; i < this.notas.length; i++) {
      if (this.notas[i].codigo == codigo) {
        return this.notas[i];
      }
    }
  }

  adicionarNota(titulo: string, texto: string, cor: string, nomeStorage: string): number {
    this.notas.push({ codigo: ++this.ultimoCodigo, titulo: titulo, texto: texto, cor: cor });
    this.setNotasStorage(nomeStorage);
    return this.ultimoCodigo;
  }

  editarNota(codigo: number, titulo: string, texto: string, cor: string, nomeStorage: string) {    
      for (let i = 0; i < this.notas.length; i++) {
        if (this.notas[i].codigo == codigo) {
          this.notas[i].titulo = titulo;
          this.notas[i].texto = texto;
          this.notas[i].cor = cor;
          break;
        }
      }
      this.setNotasStorage(nomeStorage);
  }

  excluirNota(codigo, nomeStorage: string) {    
      for (let i = 0; i < this.notas.length; i++) {
        if (this.notas[i].codigo == codigo) {
          this.notas.splice(i, 1);
          break;
        }
      }
      this.setNotasStorage(nomeStorage);    
  }

  setNotasStorage(nomeStorage: string, callback?) {
    this.storage.set(nomeStorage, JSON.stringify(this.notas)).then(result => callback ? callback(result) : console.log(result), error => console.log(error));
  }

  moverNota(codigo: number, nomeStorageOrigem: string, nomeStorageDestino: string) {
    
    let notaMovida = this.getNota(codigo);
    let novoCodigo: number = 0;

    this.storage.get(nomeStorageDestino)
    .then(result => {
      let notasDestino: any[] = [];      
      
      if(result != undefined)
      notasDestino = JSON.parse(result);

      if (notasDestino.length > 0)
        novoCodigo = notasDestino[notasDestino.length - 1].codigo;      

      notasDestino.push({ codigo: ++novoCodigo, titulo: notaMovida.titulo, texto: notaMovida.texto, cor: notaMovida.cor });      
      this.storage.set(nomeStorageDestino, JSON.stringify(notasDestino));
    });

    this.excluirNota(codigo, nomeStorageOrigem)
  }
}