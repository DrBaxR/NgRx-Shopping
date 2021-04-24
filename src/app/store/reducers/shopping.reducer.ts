import { ShoppingItem } from "../models/shopping-item.model";
import * as ShoppingActions from '../actions/shopping.actions';
import { Action, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface ShoppingState extends EntityState<ShoppingItem> {
    loading: boolean,
    error: Error
}

export const adapter: EntityAdapter<ShoppingItem> = createEntityAdapter<ShoppingItem>();

export const initialStateTest: ShoppingState = adapter.getInitialState({
    loading: false,
    error: undefined
})

const shoppingReducer = createReducer(
    initialStateTest,
    on(ShoppingActions.addItemAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.addItemSuccessAction, (state, action) => adapter.addOne(action.item, { ...state, loading: false })),
    on(ShoppingActions.addItemFailureAction, (state, action) => ({ ...state, error: action.error, loading: false })),

    on(ShoppingActions.loadShoppingAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.loadShoppingSuccessAction, (state, action) => adapter.addMany(action.list, { ...state, loading: false })),
    on(ShoppingActions.loadShoppingFailureAction, (state, action) => ({ ...state, error: action.error, loading: false })),

    on(ShoppingActions.deleteItemAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.deleteItemSuccessAction, (state, action) => adapter.removeOne(action.id, { ...state, loading: false })),
    on(ShoppingActions.deleteItemFailureAction, (status, action) => ({ ...status, error: action.error, loading: false })),
);

export function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}

const {
    selectAll
} = adapter.getSelectors();

export const selectAllItems = selectAll;