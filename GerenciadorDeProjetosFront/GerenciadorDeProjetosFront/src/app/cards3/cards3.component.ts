import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-cards3',
  templateUrl: './cards3.component.html',
  styleUrls: ['./cards3.component.css']
})
export class Cards3Component {
  constructor(private service:ApiGerenciadorService, public datepipe: DatePipe, public route:Router, private acRoute: ActivatedRoute) {}

  cardList: CardModel[] = [];

  ngOnInit(): void {
    this.service.getCardList(1,3).subscribe(d => {
      this.cardList = d;
    });
  }
}
