import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ShoppingService } from "src/app/services/shopping.service";
import { AddItemAction, AddItemFailureAction, AddItemSuccessAction, DeleteItemAction, DeleteItemFailureAction, DeleteItemSuccessAction, LoadShoppingAction, LoadShoppingFailureAction, LoadShoppingSuccessAction, ShoppingActionTypes } from "../actions/shopping.actions";

@Injectable()
export class ShoppingEffects {

    constructor(
        private actions$: Actions,
        private shoppingService: ShoppingService
    ) { }

    loadShopping$ = createEffect(() => this.actions$.pipe(
        ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
        mergeMap(() => this.shoppingService.getShoppingItems()
            .pipe(
                map(items => new LoadShoppingSuccessAction(items)),
                catchError(error => of(new LoadShoppingFailureAction(error)))
            ))
    ))

    addShoppingItem$ = createEffect(() => this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            mergeMap(
                action => this.shoppingService.addShoppingItem(action.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(action.payload)),
                        catchError(error => of(new AddItemFailureAction(error)))
                    )
            )
        ))

    deleteShoppingItem$ = createEffect(() => this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
            mergeMap(action => this.shoppingService.deleteShoppingItem(action.payload)
                .pipe(
                    map(() => new DeleteItemSuccessAction(action.payload)),
                    catchError(error => of(new DeleteItemFailureAction(error)))
                ))
        ))
}