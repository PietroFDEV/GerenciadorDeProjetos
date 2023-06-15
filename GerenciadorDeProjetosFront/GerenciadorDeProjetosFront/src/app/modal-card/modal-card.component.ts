import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CardModel } from 'src/model/cardModel';
import { CheckListModel } from 'src/model/checkListModel';

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
  deadline!: Date;
  infNome: boolean = false;
  infText: boolean = false;
  infData: boolean = false;
  idTag!: number;
  checkList: CheckListModel[] = [];
  textoCheck: string = "";

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

      this.service.getCheckByIdCard(this.cardId).subscribe(d => this.checkList = d);
  }

  public Voltar() {
    this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
  }

  public CreateCard() {
    this.infNome = false;
    this.infText = false;
    this.infData = false;
    if (this.cardName == "") {
      this.infNome = true;
    } else if (this.cardText == "") {
      this.infText = true;
    } else if (this.priority == true && this.deadline == null) {
      this.infData = true;
    } else {
      var Card = {
        name: this.cardName,
        text: this.cardText,
        deadline: this.deadline,
        priority: this.priority,
        userID: this.userId,
        listNumber: this.numeroLista,
        checkList: false,
        haveDeadLine: false
      };
      this.service.addCard(Card).subscribe(r => {
        if (r != null)
          this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
      });
    }


  }

  // public SalvarCheck(checkId: number, bool: boolean) {
  //   this.service.updateCheck(checkId, bool).subscribe(x => x);
  // }

  public ActiveCheckList() {
    this.service.getCheckByIdCard(this.cardId).subscribe(d => this.checkList = d);
  }

  public CreateCheck() {
    var Check = {
      text: this.textoCheck,
      check: false,
      idCard: this.cardId
    }
    
    this.service.addCheck(Check).subscribe(d => {
      this.service.getCheckByIdCard(this.cardId).subscribe(x => this.checkList = x);
    });

    this.textoCheck = "";
  }

  public ApagarCheck(idCard: number) {
    this.service.deleteCheck(idCard).subscribe(d => {
      this.service.getCheckByIdCard(this.cardId).subscribe(x => this.checkList = x);
    });
  }

  public AtualizarCheck(check: CheckListModel){
    var checkbyId = {
      id: check.id,
      text: check.text,
      check: check.check,
      idCard: check.idCard
    }
    this.service.updateCheck(check.id, checkbyId).subscribe(d => {
      this.checkList = [];
      this.service.getCheckByIdCard(this.cardId).subscribe(d => this.checkList = d);
    });
  }

  public SalvarEdit() {
    this.infNome = false;
    this.infText = false;
    this.infData = false;

    this.service.deleteCheckByCard(this.cardId, this.cardId);
    this.checkList.forEach(d => this.service.addCheck(d));

    if (this.card.name == "") {
      this.infNome = true;
    } else if (this.card.text == "") {
      this.infText = true;
    } else if (this.card.priority == true && this.card.deadline == null) {
      this.infData = true;
    } else {
      if (this.card.idTag == 0) {
        var Card = {
          name: this.card.name,
          text: this.card.text,
          priority: this.card.priority,
          userID: this.userId,
          deadline: this.card.deadline,
          listNumber: this.numeroLista,
          idTag: null,
          checkList: this.card.checkList,
          haveDeadLine: this.card.priority
        };
        this.service.updateCard(this.cardId, Card).subscribe(r => {
          this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
        });
      } else {
        var CardB = {
          name: this.card.name,
          text: this.card.text,
          priority: this.card.priority,
          userID: this.userId,
          deadline: this.card.deadline,
          listNumber: this.numeroLista,
          idTag: this.card.idTag,
          haveDeadLine: this.card.priority
        };
        this.service.updateCard(this.cardId, CardB).subscribe(r => {
          this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
        });
      }


    }
  }

  public ApagarCard() {
    this.service.deleteCard(this.cardId).subscribe(r => {
      this.route.navigate(['/gerenciador-home/' + this.userId, { iduser: this.userId }]);
    });

  }
}
