import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { Observable } from 'rxjs';
import { ListaModel } from 'src/model/listaModel';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-gerenciador-home',
  templateUrl: './gerenciador-home.component.html',
  styleUrls: ['./gerenciador-home.component.css']
})
export class GerenciadorHomeComponent implements OnInit {

  ListaList$!:Observable<ListaModel[]>;
  CardList$!:Observable<CardModel[]>;

  constructor(private service:ApiGerenciadorService) {}

  userId: number = 1;

  ngOnInit(): void {
    this.ListaList$ = this.service.getList();
    this.CardList$ = this.service.getCardList(this.userId);
    console.log(this.CardList$);
  }


}
