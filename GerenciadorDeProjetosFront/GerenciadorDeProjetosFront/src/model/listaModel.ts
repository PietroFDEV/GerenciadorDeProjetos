import { loginModel } from "./loginModel";

export interface ListaModel 
{
    id: number,
    listName: string,
    priorityList: boolean,
    active: boolean,
    idUser: number,
    user: loginModel
}