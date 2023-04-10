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

  ngOnInit(): void {
    this.Iniciar();
    
  }
  
  public Iniciar() {
    this.ListaList$ = this.service.getList();
    this.UserList$ = this.service.getUser();
    this.CardList$ = this.service.getCardList(this.userId, this.listId);
  }

  public ModalCreate() {
    this.criarModal = true;
  }

  // public CreateList() {
  //   this.service.addList().subscribe(result => {
  //     result.
  //   });
  // }
}