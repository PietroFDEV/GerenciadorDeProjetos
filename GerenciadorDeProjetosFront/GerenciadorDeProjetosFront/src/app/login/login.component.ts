import { Component, OnInit } from '@angular/core';
import { ApiGerenciadorService } from '../api-gerenciador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginList$!:Observable<any[]>;

  // Map to display data ssoiate with foreign keys
  loginMap:Map<number, string> = new Map();

  constructor(private service:ApiGerenciadorService) {}

  ngOnInit(): void {
        this.loginList$ = this.service.getUser();
  }
}
