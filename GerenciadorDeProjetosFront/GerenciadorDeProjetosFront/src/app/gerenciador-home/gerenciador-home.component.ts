import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { Observable } from 'rxjs';
import { ListaModel } from 'src/model/listaModel';
import { CardModel } from 'src/model/cardModel';
import { DatePipe } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { loginModel } from 'src/model/loginModel';

@Component({
  selector: 'app-gerenciador-home',
  templateUrl: './gerenciador-home.component.html',
  styleUrls: ['./gerenciador-home.component.css']
})
export class GerenciadorHomeComponent implements OnInit {

  ListaList$!:Observable<ListaModel[]>;
  CardList$!:Observable<CardModel[]>;
  UserList$!:Observable<loginModel[]>;

  constructor(private service:ApiGerenciadorService, public datepipe: DatePipe) {}

  userId:number = 1;
  listId:number = 1;
  criarModal:boolean = false;
  createList:boolean = false;
  createCard:boolean = false;
  editCard:boolean = false;

  //List atributes
  listName: string = "";
  priority: boolean = false;

  //Card atributes
  cardName: string = "";
  cardText: string = "";


  ngOnInit(): void {
    this.Iniciar();
    
  }
  
  public Iniciar() {
    this.ListaList$ = this.service.getList();
    this.UserList$ = this.service.getUser();
    this.CardList$ = this.service.getCardList(this.userId, this.listId);
  }

  public ModalCreate(num:number) {
    this.criarModal = true;

    switch(num){
      case 1:
        this.createList = true;
      break;
      case 2:
        this.createCard = true;
      break;
      case 3:
        this.editCard = true;
      break;
    }
  }

  public CreateList() {
    var newList = {
      listName: this.listName,
      priorityList: this.priority,
      active: true,
      idUser: this.userId
    }
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
    }
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
  }
  public EditCard(id:number) {
    this.service.getCardsById(id).subscribe(r => {
      this.cardName = r.name;
      this.cardText = r.text;
    })
    var Card = {
      name: this.cardName,
      text: this.cardText,
      priority: this.priority,
      userId: this.userId,
      listId: this.listId
    }
    this.service.updaCard(id, Card).subscribe(r => {

    })
  }

}