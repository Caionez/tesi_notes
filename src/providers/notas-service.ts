import { Injectable } from '@angular/core'; 

@Injectable()
export class NotasService { 

  notas = [
    { codigo: 1, titulo: 'Nota 1', texto: 'Texto da nota 1 \nOutra linha de texto da nota 1', cor: 'green' },
    { codigo: 2, titulo: 'Nota 2', texto: 'Texto da nota 2 \nOutra linha de texto da nota 2', cor: 'yellow' },
    { codigo: 3, titulo: 'Nota 3', texto: 'Texto da nota 3', cor: 'blue' },
  ];
  ultimoCodigo = 3; 

  constructor() { 

  } 

  getNotas() {
    return this.notas; 
  } 
} 