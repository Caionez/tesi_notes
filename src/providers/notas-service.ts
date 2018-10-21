import { Injectable } from '@angular/core';

@Injectable()
export class NotasService {

  notas: any[];
  ultimoCodigo: number;

  constructor() {
    this.notas = [{ codigo: 1, titulo: 'Nota 1', texto: 'Texto da nota 1 \nOutra linha de texto da nota 1', cor: 'green' },
    { codigo: 2, titulo: 'Nota 2', texto: 'Texto da nota 2 \nOutra linha de texto da nota 2', cor: 'yellow' },
    { codigo: 3, titulo: 'Nota 3', texto: 'Texto da nota 3', cor: 'blue' },
    ];
    this.ultimoCodigo = this.notas.length;
  }

  getNotas() {
    return this.notas;
  }

  getNota(codigo: number) {
    for (let i = 0; i < this.notas.length; i++) {
      if (this.notas[i].codigo == codigo) {
        return this.notas[i];
      }
    }

    return undefined;
  }
    adicionarNota(titulo: string, texto: string, cor: string): number {
      this.notas.push({ codigo: ++this.ultimoCodigo, titulo: titulo, texto: texto, cor: cor });
      return this.ultimoCodigo;
    }

    editarNota(codigo: number, titulo: string, texto: string, cor: string) {
      for (let i = 0; i < this.notas.length; i++) {
        if (this.notas[i].codigo == codigo) {
          this.notas[i].titulo = titulo;
          this.notas[i].texto = texto;
          this.notas[i].cor = cor;
          break;
        }
      }
    }

    excluirNota(codigo) {
      for (let i = 0; i < this.notas.length; i++) {
        if (this.notas[i].codigo == codigo) {
          this.notas.splice(i, 1);
          break;
        }
      }
    }
  } 