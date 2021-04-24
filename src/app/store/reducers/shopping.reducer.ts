import { ShoppingItem } from "../models/shopping-item.model";
import * as ShoppingActions from '../actions/shopping.actions';
import { Action, createReducer, on } from "@ngrx/store";

export interface ShoppingState {
    list: Array<ShoppingItem>,
    loading: boolean,
    error: Error
}

const initialState: ShoppingState = {
    list: [],
    loading: false,
    error: undefined
}

const shoppingReducer = createReducer(
    initialState,
    on(ShoppingActions.addItemAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.addItemSuccessAction, (state, action) => ({ ...state, list: [...state.list, action.item], loading: false })),
    on(ShoppingActions.addItemFailureAction, (state, action) => ({ ...state, error: action.error, loading: false })),

    on(ShoppingActions.loadShoppingAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.loadShoppingSuccessAction, (state, action) => ({ ...state, list: action.list, loading: false })),
    on(ShoppingActions.loadShoppingFailureAction, (state, action) => ({ ...state, error: action.error, loading: false })),

    on(ShoppingActions.deleteItemAction, state => ({ ...state, loading: true })),
    on(ShoppingActions.deleteItemSuccessAction, (state, action) => ({
        ...state, 
        list: state.list.filter(item => item.id !== action.id),
        loading: false
    })),
    on(ShoppingActions.deleteItemFailureAction, (status, action) => ({...status, error: action.error, loading: false})),
);

export function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}