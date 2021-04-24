import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import * as fromShopping from '../reducers/shopping.reducer';

export const selectShoppingState = (state: AppState) => state.shopping;

export const selectAllItems = createSelector(
    selectShoppingState, 
    fromShopping.selectAllItems
);

export const selectLoading = createSelector(
    selectShoppingState, 
    state => state.loading
);

export const selectError = createSelector(
    selectShoppingState,
    state => state.error
)