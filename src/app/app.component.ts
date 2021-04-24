import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';

import { v4 as uuid } from 'uuid';
import * as ShoppingActions from './store/actions/shopping.actions';
import { selectAllItems, selectError, selectLoading } from './store/selectors/shopping.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  shoppingItems$: Observable<ShoppingItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = { id: '', name: '' };

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.shoppingItems$ = this.store.select(selectAllItems);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.store.dispatch(ShoppingActions.loadShoppingAction());
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(ShoppingActions.addItemAction({ item: this.newShoppingItem }));

    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string) {
    this.store.dispatch(ShoppingActions.deleteItemAction({ id: id }));
  }
}
