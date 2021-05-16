import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ShoppingItem } from '../store/models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemDataService extends DefaultDataService<ShoppingItem> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config: DefaultDataServiceConfig
  ) { 
    super('ShoppingItem', http, httpUrlGenerator, config);
  }

  add(item: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>('http://localhost:3000/shoppingItems', item);
  }
}
