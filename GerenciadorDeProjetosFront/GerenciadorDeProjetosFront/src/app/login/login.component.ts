import { Component, Input, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { Observable } from 'rxjs';
import { ResourceLoader } from '@angular/compiler';
import { loginModel } from 'src/model/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiGerenciadorService]
})
export class LoginComponent implements OnInit {

  loginList$!:Observable<any[]>;

  constructor(private service:ApiGerenciadorService) {}


  mostrarLogin:boolean = true;
  mostrarCreateLogin: boolean = false;
  mostrarGerenciador: boolean = false;
  erroLogin: boolean = false;
  loginCriado: boolean = false;
  filtroLogin!:loginModel;

  @Input() loginUser:any;
  login: string = "";
  email: string = "";
  pass: string = "";

  ngOnInit(): void {
  }

  public Login() {
    this.service.existsUser(this.login, this.pass)
      .subscribe(result => {
        if(result) {
          this.mostrarLogin = false;
          this.erroLogin = false;
          this.mostrarGerenciador = true;
        }else {
          this.erroLogin = true;
        }
      })
  }

  public CreateLogin() {
    this.erroLogin = false;
    this.mostrarLogin = false;
    this.mostrarCreateLogin = true;
  }

  public CreateUser() {
    var loginUser = {
      userLogin: this.login,
      userPass: this.pass,
      email: this.email 
    }
    this.service.addUser(loginUser)
      .subscribe(result => {
        if(result.id != 0){          
          this.loginCriado = true;
          this.mostrarCreateLogin = false;
          this.mostrarLogin = true;
          this.loginUser = null;
        }
       else{
        alert("ERRO");
       }
      })
  }

  public VoltarCadastro() {
    this.mostrarCreateLogin = false;
    this.mostrarLogin = true;
  }
  
}