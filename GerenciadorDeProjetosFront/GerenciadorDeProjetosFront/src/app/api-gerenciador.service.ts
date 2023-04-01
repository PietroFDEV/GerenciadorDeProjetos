import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGerenciadorService {

  readonly gerenciadorAPIUrl = "https://localhost:7157/api";

  constructor(private http:HttpClient) { }

  //LOGIN USUARIO CRUD
  getUser():Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/LoginUsers');
  }

  addUser(data:any) {
    return this.http.post(this.gerenciadorAPIUrl + '/LoginUsers', data)
  }

  updateUser(id:number, data:any) {
    return this.http.put(this.gerenciadorAPIUrl + `/LoginUsers/${id}`, data)
  }

  deleteUser(id:number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/LoginUsers/${id}`)
  }

  existsUser(login:string, pass:string):Observable<boolean> {
    return this.http.get<boolean>(this.gerenciadorAPIUrl + `/LoginUsers/${login}/${pass}`)
  }

  //LISTA CRUD
  getList():Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/Lists');
  }

  addList(data:any) {
    return this.http.post(this.gerenciadorAPIUrl + '/Lists', data)
  }

  updateList(id:number, data:any) {
    return this.http.put(this.gerenciadorAPIUrl + `/Lists/${id}`, data)
  }

  deleteList(id:number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/Lists/${id}`)
  }

    //CARDS CRUD
    getCards():Observable<any[]> {
      return this.http.get<any>(this.gerenciadorAPIUrl + '/CardList');
    }
  
    addCard(data:any) {
      return this.http.post(this.gerenciadorAPIUrl + '/CardList', data)
    }
  
    updaCard(id:number, data:any) {
      return this.http.put(this.gerenciadorAPIUrl + `/CardList/${id}`, data)
    }
  
    deleteCard(id:number) {
      return this.http.delete(this.gerenciadorAPIUrl + `/CardList/${id}`)
    }
}
