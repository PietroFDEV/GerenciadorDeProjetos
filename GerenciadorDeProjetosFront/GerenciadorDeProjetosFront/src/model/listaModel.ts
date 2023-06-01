
export interface CardModel {
    idC: number;
    name: string;
    text: string;
    createDate: Date;
    deadline: Date;
    priority: boolean;
    userId: number;
    listId: number;
    haveDeadline?: boolean;
}

export class ListaModel {
    idL!: number;
    listName!: string;
    priorityList!: boolean;
    active!: boolean;
    idUser!: number;
    card!: CardModel[];
    listNumber!: number;
}