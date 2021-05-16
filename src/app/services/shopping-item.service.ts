import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ShoppingItem } from '../store/models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService extends EntityCollectionServiceBase<ShoppingItem> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) { 
    super('ShoppingItem', serviceElementsFactory);
  }
}
