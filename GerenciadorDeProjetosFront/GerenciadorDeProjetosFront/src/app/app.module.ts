import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GerenciadorHomeComponent } from './gerenciador-home/gerenciador-home.component';
import { ApiGerenciadorService } from './api-gerenciador.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GerenciadorHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiGerenciadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
