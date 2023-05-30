export interface CardModel 
{
    id: number;
    name: string;
    text: string;
    createDate: Date;
    deadline: Date;
    priority: boolean;
    userId: number;
    listId: number;
    haveDeadline?: boolean;
}

export interface ListaModel 
{
    id: number;
    listName: string;
    priorityList: boolean;
    active: boolean;
    idUser: number;
    card: CardModel[];
}
