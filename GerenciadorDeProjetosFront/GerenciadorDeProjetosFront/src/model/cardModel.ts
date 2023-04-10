import { loginModel } from "./loginModel";

export interface CardModel 
{
    id: number,
    name: string,
    text: string,
    createDate: Date,
    deadline: Date,
    haveDeadline: boolean,
    priority: boolean,
    userId: number,
    listId: number,
    user: loginModel
}