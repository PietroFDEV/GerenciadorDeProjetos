import { Observable } from "rxjs";
import { CardModel } from "./cardModel";

export interface ListaModel 
{
    id: number,
    listName: string,
    priorityList: boolean,
    active: boolean,
    idUser: number,
    card: Observable<CardModel[]>
}