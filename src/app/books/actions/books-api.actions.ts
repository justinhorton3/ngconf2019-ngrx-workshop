import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BooksApiActionTypes {
    BooksLoaded = '[Books API] Books Loaded Success',
    BooksCreated = '[Books API] Books Created',
    BooksUpdated = '[Books API] Books Updated', 
    BooksDeleted = '[Books API] Books Deleted'
}

export class BooksLoaded implements Action {
    readonly type = BooksApiActionTypes.BooksLoaded;

    constructor(public books: Book[]) {}
}

export class BooksCreated implements Action {
    readonly type = BooksApiActionTypes.BooksCreated;

    constructor(public books: Book[]) {}
}
export class BooksUpdated implements Action {
    readonly type = BooksApiActionTypes.BooksUpdated;

    constructor(public books: Book[]) {}
}

export class BooksDeleted implements Action {
    readonly type = BooksApiActionTypes.BooksDeleted;

    constructor(public books: Book[]) {}
}

export type BooksApiActions = 
    | BooksLoaded
    | BooksCreated
    | BooksUpdated
    | BooksDeleted
