import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';

import { v4 as uuid } from 'uuid';
import { ShoppingItemService } from './services/shopping-item.service';

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
    private shoppingItemService: ShoppingItemService,
  ) {
    this.shoppingItems$ = this.shoppingItemService.entities$;
    this.loading$ = this.shoppingItemService.loading$;
  }

  ngOnInit() {
    this.shoppingItemService.getAll();
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
