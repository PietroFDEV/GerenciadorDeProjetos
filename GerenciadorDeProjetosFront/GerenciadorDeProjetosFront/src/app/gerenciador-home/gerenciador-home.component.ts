import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { Observable } from 'rxjs';
import { ListaModel } from 'src/model/listaModel';
import { CardModel } from 'src/model/cardModel';
import { DatePipe } from '@angular/common';
import { loginModel } from 'src/model/loginModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gerenciador-home',
  templateUrl: './gerenciador-home.component.html',
  styleUrls: ['./gerenciador-home.component.css']
})
export class GerenciadorHomeComponent implements OnInit {

  ListaList$!:Observable<ListaModel[]>;
  CardList$!:Observable<CardModel[]>;
  UserList$!:Observable<loginModel[]>;

  constructor(private service:ApiGerenciadorService, public datepipe: DatePipe, public route:Router, private acRoute: ActivatedRoute) {}

  userId:number = 1;
  listId:number = 0;
  criarModal:boolean = false;
  createList:boolean = false;
  createCard:boolean = false;
  editCard:boolean = false;
  Lista: CardModel[] = [];

  //List atributes
  listName: string = "";
  priority: boolean = false;

  //Card atributes
  cardName: string = "";
  cardText: string = "";
  cardId: number = 0;


  ngOnInit(): void {
    this.acRoute.params.subscribe(d => {
      this.userId = JSON.parse(d['iduser']);
    });

    this.Iniciar();
    // this.LoadCard();

  }
  
  public Iniciar() {
    this.ListaList$ = this.service.getListUserId(this.userId);
    this.UserList$ = this.service.getUser();

    // this.LoadCard();
    //this.ListaList$.forEach(d => d.forEach(x => console.log(x.card)));

  }

  // public LoadCard() {
  //   this.ListaList$.subscribe(r => {
  //     r.forEach(d => {
  //       d.card = [];
  //       this.service.getCardList(this.userId, d.id).subscribe(c => {
  //         if(c != null){
  //         c.forEach(x => {
  //           d.card.push(x);
  //         });
  //       }
  //       });
  //     });
  //     return r;
  //   },(err) => console.log(err));
  //   console.log(this.ListaList$.forEach(d => d.forEach(x => console.log(x.card))));
  // }

  public ModalCreate(num:number) {
    switch(num){
      case 1:
        this.createList = true;
      break;
    }
  }

  public ModalCard(idList: number){
    this.criarModal = true;
    this.createCard = true;
    this.listId = idList;
  }

  public CreateList() {
    var newList = {
      listName: this.listName,
      priorityList: this.priority,
      active: true,
      idUser: this.userId
    };
    this.service.addList(newList)
      .subscribe(result => {
        if(result.id != 0){
          this.criarModal = false;
          this.createList = false;
          this.Iniciar();
          this.listName = "";
          this.priority = false;
        }
       else{
        alert("ERRO");
       }
      });
  }

  public CreateCard() {
    var newCard = {
      name: this.cardName,
      text: this.cardText,
      priority: this.priority,
      userId: this.userId,
      listId: this.listId
    };
    this.service.addCard(newCard)
      .subscribe(result => {
        if(result.id != 0){
          this.criarModal = false;
          this.createCard = false;
          this.Iniciar();
          this.cardName = "";
          this.cardText = "";
          this.priority = false;
        }
       else{
        alert("ERRO");
       }
      });
      this.listId = 0;
  }

  public EditCard(id:number) {
    this.service.getCardsById(id).subscribe(r => {
      this.cardName = r.name;
      this.cardText = r.text;
      this.cardId = r.id;
    });
  }

  public SalvarEdit() {
    var Card = {
      name: this.cardName,
      text: this.cardText,
      priority: this.priority,
      userId: this.userId,
      listId: this.listId
    };
    this.service.updaCard(this.cardId, Card).subscribe(r => {
    });
  }

  public FecharModal() {
    this.criarModal = false;
    this.createList = false;
    this.createCard = false;
    this.editCard = false;
  }

}