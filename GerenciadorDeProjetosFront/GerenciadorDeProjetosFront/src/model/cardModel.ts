export interface CardModel {
    id: number,
    name: string,
    text: string,
    createDate: Date,
    deadline: Date,
    priority: boolean,
    userId: number,
    listId: number,
    listNumber: number,
    haveDeadline?: boolean

}