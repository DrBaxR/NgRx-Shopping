import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ShoppingService } from "src/app/services/shopping.service";
import * as ShoppingActions from "../actions/shopping.actions";

@Injectable()
export class ShoppingEffects {

    constructor(
        private actions$: Actions,
        private shoppingService: ShoppingService
    ) { }

    loadShopping$ = createEffect(() => this.actions$.pipe(
        ofType(ShoppingActions.loadShoppingAction),
        mergeMap(() => this.shoppingService.getShoppingItems()
            .pipe(
                map(items => ShoppingActions.loadShoppingSuccessAction({ list: items })),
                catchError(error => of(ShoppingActions.loadShoppingFailureAction({ error: error })))
            ))
    ))

    addShoppingItem$ = createEffect(() => this.actions$
        .pipe(
            ofType(ShoppingActions.addItemAction),
            mergeMap(
                action => this.shoppingService.addShoppingItem(action.item)
                    .pipe(
                        map(() => ShoppingActions.addItemSuccessAction({ item: action.item })),
                        catchError(error => of(ShoppingActions.addItemFailureAction({ error: error })))
                    )
            )
        ))

    deleteShoppingItem$ = createEffect(() => this.actions$
        .pipe(
            ofType(ShoppingActions.deleteItemAction),
            mergeMap(action => this.shoppingService.deleteShoppingItem(action.id)
                .pipe(
                    map(() => ShoppingActions.deleteItemSuccessAction({ id: action.id })),
                    catchError(error => of(ShoppingActions.deleteItemFailureAction({ error: error })))
                ))
        ))
}