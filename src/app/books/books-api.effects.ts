import { Injectable } from '@angular/core';
import { Effect, Actions, ofType} from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap, exhaustMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

import { BooksService } from '../shared/services/book.service';
import { BooksPageActions, BooksApiActions } from './actions';

@Injectable()
export class BooksApiEffects {

    @Effect()
    loadBooks$ = this.actions$.pipe(
        ofType(BooksPageActions.BooksPageActionTypes.Enter),
        exhaustMap(() =>
            this.booksService.all().pipe(
                map(books => new BooksApiActions.BooksLoaded(books)),
                catchError(() => EMPTY)
            )
        )
    );

    @Effect()
    createBooks$ = this.actions$.pipe(
        ofType(BooksPageActions.BooksPageActionTypes.CreateBook),
        concatMap(() =>
            this.booksService.all().pipe(
                map(books => new BooksApiActions.BooksCreated(books)),
                catchError(() => EMPTY)
            )
        )
    );

    @Effect()
    updateBooks$ = this.actions$.pipe(
        ofType(BooksPageActions.BooksPageActionTypes.UpdateBook),
        concatMap(() =>
            this.booksService.all().pipe(
                map(books => new BooksApiActions.BooksUpdated(books)),
                catchError(() => EMPTY)
            )
        )
    );

    @Effect()
    deleteBooks$ = this.actions$.pipe(
        ofType(BooksPageActions.BooksPageActionTypes.DeleteBook),
        mergeMap(() =>
            this.booksService.all().pipe(
                map(books => new BooksApiActions.BooksDeleted(books)),
                catchError(() => EMPTY)
            )
        )
    );




    constructor(
        private booksService: BooksService,
        private actions$: Actions<
          BooksPageActions.BooksPageActions | BooksApiActions.BooksApiActions
        >
      ) {}
}    
