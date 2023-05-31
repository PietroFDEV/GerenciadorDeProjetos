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

@NgModule({
  declarations: [
    AppComponent,
    GerenciadorHomeComponent,
    LoginComponent,
    CardsComponent
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
