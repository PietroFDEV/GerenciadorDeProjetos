import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/model/cardModel';
import { loginModel } from 'src/model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class ApiGerenciadorService {

  // [HttpGet("GetCardListByUserId/{UserId}")]
  // public async Task<ActionResult<IEnumerable<CardList>>> GetCardListByUserId(int UserId)
  // {
  //     return await _context.CardList.Where(d => d.UserId == UserId).ToListAsync();
  // }

  readonly gerenciadorAPIUrl = "http://localhost:5000/api";

  constructor(private http:HttpClient) { }

  //LOGIN USUARIO CRUD
  getUser():Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/LoginUsers');
  }

  addUser(data:any):Observable<loginModel> {
    return this.http.post<loginModel>(this.gerenciadorAPIUrl + '/LoginUsers', data)
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

    getCardList(userId:number):Observable<CardModel[]> {
      console.log(this.http.get<CardModel[]>(this.gerenciadorAPIUrl + `/CardLists/GetCardListByUserId/${userId}`));
      return this.http.get<CardModel[]>(this.gerenciadorAPIUrl + `/CardLists/GetCardListByUserId/${userId}`);
    }
}
