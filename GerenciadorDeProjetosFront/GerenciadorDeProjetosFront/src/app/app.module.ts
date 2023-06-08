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
import { ModalCardComponent } from './modal-card/modal-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GerenciadorHomeComponent,
    LoginComponent,
    CardsComponent,
    ModalCardComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'gerenciador-home/:iduser', component: GerenciadorHomeComponent },
      { path: 'modal-card/:idcard', component: ModalCardComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [ApiGerenciadorService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
