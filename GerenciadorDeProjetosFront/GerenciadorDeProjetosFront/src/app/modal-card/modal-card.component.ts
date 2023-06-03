import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CardModel } from 'src/model/cardModel';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.css']
})
export class ModalCardComponent implements OnInit {

  constructor(private service: ApiGerenciadorService, public datepipe: DatePipe, public route: Router, private acRoute: ActivatedRoute) { }

  card!: CardModel;
  //Card atributes
  cardName: string = "";
  cardText: string = "";
  cardId: number = 0;
  priority: boolean = false;
  numeroLista: number = 0;
  numeroCategoria: number = 0;
  userId: number = 0;

  ngOnInit(): void {
    this.acRoute.params.subscribe(d => {
      this.cardId = JSON.parse(d['idCard']);
      this.numeroLista = JSON.parse(d['numeroLista']);
      this.numeroCategoria = JSON.parse(d['numero']);
      this.userId = JSON.parse(d['userId']);



      if (this.numeroCategoria == 2) {
        this.priority = false;
      } else if (this.numeroCategoria == 1) {
        this.service.getCardsById(this.cardId).subscribe(d => this.card = d);
      }
    });
  }

  public Voltar() {
    this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
  }

  public CreateCard() {
    var Card = {
      name: this.cardName,
      text: this.cardText,
      priority: this.priority,
      userID: this.userId,
      listNumber: this.numeroLista
    };
    this.service.addCard(Card).subscribe(r => {
      if (r != null)
        this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
    });
  }

  public SalvarEdit() {
    var Card = {
      name: this.card.name,
      text: this.card.text,
      priority: this.card.priority,
      userID: this.userId,
      listNumber: this.numeroLista
    };
    this.service.updateCard(this.cardId, Card).subscribe(r => {
      this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
    });
  }
}
