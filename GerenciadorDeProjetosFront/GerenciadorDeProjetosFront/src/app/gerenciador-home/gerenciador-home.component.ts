import { Component, OnChanges, OnInit } from '@angular/core';
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
export class GerenciadorHomeComponent implements OnInit, OnChanges {

  ListaList$!: Observable<ListaModel[]>;
  CardList$!: Observable<CardModel[]>;
  UserList$!: Observable<loginModel[]>;

  constructor(private service: ApiGerenciadorService, public datepipe: DatePipe, public route: Router, private acRoute: ActivatedRoute) { }

  userId: number = 0;
  listId: number = 0;
  criarModal: boolean = false;
  createList: boolean = false;
  editList: boolean = false;
  editCard: boolean = false;
  deleteList: boolean = false;
  listaNumber: number = 1;
  listaForEach: number = 0;
  listNumberDelete: number = 0;

  cardList1: CardModel[] = [];
  cardList2: CardModel[] = [];
  cardList3: CardModel[] = [];
  cardList4: CardModel[] = [];
  cardList5: CardModel[] = [];
  cardList6: CardModel[] = [];

  

  //List atributes
  idListEdita: number = 0;
  listName: string = "";
  priority: boolean = false;

  ngOnInit(): void {
    this.acRoute.params.subscribe(d => {
      this.userId = JSON.parse(d['iduser']);
    });

    this.Iniciar();
  }


  ngOnChanges(): void {
    this.Iniciar();
  }

  public Iniciar() {
    this.listaNumber = 1;
    this.listaForEach = 1;

    this.ListaList$ = this.service.getListUserId(this.userId);
    this.ListaList$.forEach(d => {
      if (d.length > 0)
        d.forEach(x => {
          if (this.listaForEach > d.length) { }
          else
            this.listaNumber = this.listaNumber + 1;

          this.listaForEach = this.listaForEach + 1;
        });
    });
    this.service.getCardList(this.userId, 1).subscribe(d => {
      this.cardList1 = d;
    });
  }
  
  public EditCard(idCard: number, numeroEdit: number, listaNumber: number) {
    this.route.navigate(['/modal-card/' + idCard, { idCard: idCard, numero: numeroEdit, userId: this.userId, numeroLista: listaNumber }]);
  }

  public ModalCreate(num: number) {
    switch (num) {
      case 1:
        this.createList = true;
        break;
    }
  }

  public CreateList() {
    var newList = {
      listName: this.listName,
      priorityList: this.priority,
      active: true,
      idUser: this.userId,
      listNumber: this.listaNumber
    };

    this.service.addList(newList)
      .subscribe(result => {
        if (result.id != 0) {
          this.criarModal = false;
          this.createList = false;
          this.Iniciar();
          this.listName = "";
          this.priority = false;
        }
        else {
          alert("ERRO");
        }
      });
  }

  public FecharModal() {
    this.criarModal = false;
    this.createList = false;
    this.deleteList = false;
    this.editList = false;
  }

  public ApagarLista(idLIsta: number, listaNumber: number) {
    this.listNumberDelete = listaNumber;
    this.deleteList = true;
  }

  public SalvarDeletList() {
    this.service.deleteCards(this.listNumberDelete, this.userId).subscribe();
    this.service.deleteListByUser(this.listNumberDelete, this.userId).subscribe();
    window.location.reload();
  }

  public EditarLista(idLista: number) {
    this.idListEdita = idLista;
    this.service.getListId(idLista).subscribe(d => {
      this.listName = d.listName;
      this.priority = d.priorityList;
    });
    this.editList = true;
  }

  public SalvarEditList() {
    var List = {
      listName: this.listName,
      priorityList: this.priority
    };
    this.service.updateList(this.idListEdita, List).subscribe(d => {
      window.location.reload();
    });
  }

}

/*Lixo pra DEPOIS*/

  // this.LoadCard();
  //this.ListaList$.forEach(d => d.forEach(x => console.log(x.card)));

  // public trackMethod(index: number, el: ListaModel): number {
  //   return el.card[index].idC;
  // }

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
    // public EditCard(id: number) {
  //   this.service.getCardsById(id).subscribe(r => {
  //     this.cardName = r.name;
  //     this.cardText = r.text;
  //     this.cardId = r.id;
  //   });
  // }

  // public SalvarEdit() {
  //   var Card = {
  //     name: this.cardName,
  //     text: this.cardText,
  //     priority: this.priority,
  //     userId: this.userId,
  //     listId: this.listId
  //   };
  //   this.service.updateCard(this.cardId, Card).subscribe(r => {
  //   });
  // }

  // public CreateCard() {
  //   var newCard = {
  //     name: this.cardName,
  //     text: this.cardText,
  //     priority: this.priority,
  //     userId: this.userId,
  //     listId: this.listId
  //   };
  //   this.service.addCard(newCard)
  //     .subscribe(result => {
  //       if (result.id != 0) {
  //         this.Iniciar();
  //       }
  //       else {
  //         alert("ERRO");
  //       }
  //     });
  //   this.listId = 0;
  // }
  // public ModalCard(idList: number) {
  //   this.criarModal = true;
  //   this.createCard = true;
  //   this.listId = idList;
  // }