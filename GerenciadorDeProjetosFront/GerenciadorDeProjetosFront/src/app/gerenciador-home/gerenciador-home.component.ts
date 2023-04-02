import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciador-home',
  templateUrl: './gerenciador-home.component.html',
  styleUrls: ['./gerenciador-home.component.css']
})
export class GerenciadorHomeComponent implements OnInit {

  mostrarLogin:boolean = true;
  mostrarGerenciador:boolean = true;


  ngOnInit(): void {
    
  }
}
