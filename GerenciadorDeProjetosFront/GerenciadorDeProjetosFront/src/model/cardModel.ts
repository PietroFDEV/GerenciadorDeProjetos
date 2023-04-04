import { loginModel } from "./loginModel";

export interface CardModel 
{
    id: number;
    name: string;
    text: string;
    createDate: Date;
    deadLine: Date;
    priority: boolean;
    userId: number;
    listId: number;
    user: loginModel
}