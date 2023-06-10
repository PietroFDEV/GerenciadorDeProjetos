import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/model/cardModel';
import { CheckListModel } from 'src/model/checkListModel';
import { ListaModel } from 'src/model/listaModel';
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

  constructor(private http: HttpClient) { }

  //LOGIN USUARIO CRUD
  getUser(): Observable<loginModel[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/LoginUsers');
  }

  addUser(data: any): Observable<loginModel> {
    return this.http.post<loginModel>(this.gerenciadorAPIUrl + '/LoginUsers', data)
  }

  updateUser(id: number, data: any) {
    return this.http.put(this.gerenciadorAPIUrl + `/LoginUsers/${id}`, data)
  }

  deleteUser(id: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/LoginUsers/${id}`)
  }

  getUserById(id: number): Observable<loginModel> {
    return this.http.get<loginModel>(this.gerenciadorAPIUrl + `/LoginUsers/${id}`)
  }

  existsUser(login: string, pass: string): Observable<number> {
    return this.http.get<number>(this.gerenciadorAPIUrl + `/LoginUsers/${login}/${pass}`)
  }

  //LISTA CRUD
  getList(): Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/Lists');
  }

  getListUserId(userId: number): Observable<ListaModel[]> {
    return this.http.get<ListaModel[]>(this.gerenciadorAPIUrl + `/Lists/user/${userId}`);
  }

  getListId(userId: number): Observable<ListaModel> {
    return this.http.get<ListaModel>(this.gerenciadorAPIUrl + `/Lists/${userId}`);
  }

  addList(data: any): Observable<ListaModel> {
    return this.http.post<ListaModel>(this.gerenciadorAPIUrl + '/Lists', data)
  }

  updateList(id: number, data: any) {
    return this.http.put(this.gerenciadorAPIUrl + `/Lists/${id}`, data)
  }

  deleteList(id: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/Lists/${id}`)
  }

  deleteListByUser(listaNumber: number, userId: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/Lists/DeleteLists/${listaNumber}/${userId}`)
  }

  //CARDS CRUD
  getCards(): Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/CardLists');
  }

  getCardsById(id: number): Observable<CardModel> {
    return this.http.get<CardModel>(this.gerenciadorAPIUrl + `/CardLists/${id}`);
  }

  addCard(data: any): Observable<CardModel> {
    debugger
    return this.http.post<CardModel>(this.gerenciadorAPIUrl + '/CardLists', data)
  }

  updateCard(id: number, data: any) {
    return this.http.put(this.gerenciadorAPIUrl + `/CardLists/${id}`, data)
  }

  deleteCard(id: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/CardLists/${id}`)
  }

  deleteCards(listNumber: number, idUser: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/CardLists/DeleteCards/${listNumber}/${idUser}`)
  }

  getCardList(userId: number, listNumber: number): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(this.gerenciadorAPIUrl + `/CardLists/GetCardListByUserId/${userId}/${listNumber}`);
  }

  //CARDS CHECKLIST
  getCheck(): Observable<any[]> {
    return this.http.get<any>(this.gerenciadorAPIUrl + '/CheckLists');
  }

  // getCheckById(id: number): Observable<CardModel> {
  //   return this.http.get<CardModel>(this.gerenciadorAPIUrl + `/CheckLists/${id}`);
  // }

  getCheckByIdCard(id: number): Observable<CheckListModel[]> {
    return this.http.get<CheckListModel[]>(this.gerenciadorAPIUrl + `/CheckLists/${id}`);
  }

  addCheck(data: any): Observable<CheckListModel> {
    return this.http.post<CheckListModel>(this.gerenciadorAPIUrl + '/CheckLists', data)
  }

  updateCheck(id: number, data: any) {
    return this.http.put(this.gerenciadorAPIUrl + `/CheckLists/${id}`, data)
  }

  deleteCheck(id: number) {
    return this.http.delete(this.gerenciadorAPIUrl + `/CheckLists/${id}`)
  }
}
