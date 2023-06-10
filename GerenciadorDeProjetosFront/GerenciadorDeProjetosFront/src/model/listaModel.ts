
export class ListaModel {
    id!: number;
    listName!: string;
    priorityList!: boolean;
    active!: boolean;
    idUser!: number;
    listNumber!: number;
}

export interface Lista {
    lista: ListaModel;
}