import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';

import { v4 as uuid } from 'uuid';
import { ShoppingItemService } from './services/shopping-item.service';
import { Store } from '@ngrx/store';
import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';

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

  private myCustomAction: EntityAction<ShoppingItem>;

  constructor(
    private shoppingItemService: ShoppingItemService,
    private entityActionFactory: EntityActionFactory,
    private store: Store
  ) {
    this.shoppingItems$ = this.shoppingItemService.entities$;
    this.loading$ = this.shoppingItemService.loading$;
  }

  ngOnInit() {
    this.myCustomAction = this.createAction();

    this.store.dispatch(this.myCustomAction);
    // this.shoppingItemService.getAll();
  }

  createAction(): EntityAction<ShoppingItem> {
    // this one is equivalent with shoppingService.getAll()
    // can check to see in the redux Chrome plugin that the tag is the one set below
    return this.entityActionFactory.create<ShoppingItem>(
      'ShoppingItem',
      EntityOp.QUERY_ALL,
      null,
      { tag: 'My Custom Action' }
    );

    // alternative way to create action by hand without using factory
    // return {
    //   payload: {
    //     entityName: 'ShoppingItem',
    //     entityOp: EntityOp.QUERY_ALL
    //   },
    //   type: '[Custom Action] my/custom/type'
    // }
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.shoppingItemService.add(this.newShoppingItem);

    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string) {
    this.shoppingItemService.delete(id);
  }
}
