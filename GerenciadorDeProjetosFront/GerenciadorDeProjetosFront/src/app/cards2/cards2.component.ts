import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-cards2',
  templateUrl: './cards2.component.html',
  styleUrls: ['./cards2.component.css']
})
export class Cards2Component {
  constructor(private service:ApiGerenciadorService, public datepipe: DatePipe, public route:Router, private acRoute: ActivatedRoute) {}

  cardList: CardModel[] = [];

  ngOnInit(): void {
    this.service.getCardList(1,2).subscribe(d => {
      this.cardList = d;
    });
  }
}
