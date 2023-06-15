import { Component, OnChanges, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnChanges {
  constructor(private service: ApiGerenciadorService, public datepipe: DatePipe, public route: Router, private acRoute: ActivatedRoute) { }

  cardList: CardModel[] = [];
  userId: number = 0;
  ngOnInit(): void {
    this.acRoute.params.subscribe(d => {
      this.userId = JSON.parse(d['iduser']);
    });

    this.service.getCardList(this.userId, 1).subscribe(d => {
      this.cardList = d;
    });
  }

  ngOnChanges(): void {
    this.service.getCardList(this.userId, 1).subscribe(d => {
      this.cardList = d;
    });
  }

  public EditCard(idCard: number, numeroEdit: number, listaNumber: number) {
    this.route.navigate(['/modal-card/' + idCard, { idCard: idCard, numero: numeroEdit, userId: this.userId, numeroLista: listaNumber }]);
  }
}
