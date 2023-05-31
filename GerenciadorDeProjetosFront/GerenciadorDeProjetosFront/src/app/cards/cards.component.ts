import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{
  constructor(private service:ApiGerenciadorService, public datepipe: DatePipe, public route:Router, private acRoute: ActivatedRoute) {}

  cardList: CardModel[] = [];
  ngOnInit(): void {
    this.service.getCardList(1,1).subscribe(d => {
      this.cardList = d;
    })
  }
}
