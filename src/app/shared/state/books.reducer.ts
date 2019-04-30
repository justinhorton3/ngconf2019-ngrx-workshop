import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Book } from "src/app/shared/models/book.model";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { createSelector } from "@ngrx/store";

export const initialBooks: Book[] = [
  {
    id: "1",
    name: "Fellowship of the Ring",
    earnings: 100000000,
    description: "The start"
  },
  {
    id: "2",
    name: "The Two Towers",
    earnings: 200000000,
    description: "The middle"
  },
  {
    id: "3",
    name: "The Return of The King",
    earnings: 400000000,
    description: "The end"
  }
];

export interface State extends EntityState<Book> {
  activeBookId: string | null;
}

export const adapter = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({
  activeBookId: null
});

export function reducer(
  state = initialState,
  action: BooksPageActions.BooksPageActions | BooksApiActions.BooksApiActions
): State {
  switch (action.type) {
    
    case BooksApiActions.BooksApiActionTypes.BooksLoaded:
      return adapter.addAll(action.books, state);

    case BooksPageActions.BooksPageActionTypes.SelectBook:
      return {
        ...state,
        activeBookId: action.bookId
      };

    case BooksPageActions.BooksPageActionTypes.ClearSelectedBook:
      return {
        ...state,
        activeBookId: null
      };

    case BooksPageActions.BooksPageActionTypes.CreateBook:
      return adapter.addOne(action.book, state);

    case BooksPageActions.BooksPageActionTypes.UpdateBook:
      return adapter.updateOne(
        { id: action.book.id, changes: action.book },
        { ...state, activeBookId: action.book.id }
      );

    case BooksPageActions.BooksPageActionTypes.DeleteBook:
      return adapter.removeOne(action.book.id, {
        ...state,
        activeBookId: null
      });

    default:
      return state;
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (entities, bookId) => (bookId ? entities[bookId] : null)
);
export const selectEarningsTotals = createSelector(
  selectAll,
  books =>
    books.reduce((total, book) => {
      return total + parseInt(`${book.earnings}`, 10) || 0;
    }, 0)
);