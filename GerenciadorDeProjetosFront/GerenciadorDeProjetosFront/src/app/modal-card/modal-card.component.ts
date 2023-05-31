import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.css']
})
export class ModalCardComponent {
  createCard:boolean = false;
  editCard:boolean = false;

    //Card atributes
    cardName: string = "";
    cardText: string = "";
    cardId: number = 0;
    priority: boolean = false;

    public Voltar() {

    }

    public CreateCard() {

    }

    public SalvarEdit() {
      
    }
}
