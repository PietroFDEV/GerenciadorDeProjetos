import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { GerenciadorHomeComponent } from './gerenciador-home/gerenciador-home.component';
import { ApiGerenciadorService } from './api-gerenciador.service';
import { LoginComponent } from './login/login.component';
import { DatePipe } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { Cards2Component } from './cards2/cards2.component';
import { Cards3Component } from './cards3/cards3.component';
import { ModalCardComponent } from './modal-card/modal-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GerenciadorHomeComponent,
    LoginComponent,
    CardsComponent,
    Cards2Component,
    Cards3Component,
    ModalCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'gerenciador-home/:iduser', component: GerenciadorHomeComponent}
    ])
  ],
  providers: [ApiGerenciadorService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
