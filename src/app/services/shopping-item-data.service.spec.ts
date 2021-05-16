import { TestBed } from '@angular/core/testing';

import { ShoppingItemDataService } from './shopping-item-data.service';

describe('ShoppingItemDataService', () => {
  let service: ShoppingItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
