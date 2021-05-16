import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { DefaultDataServiceConfig, EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './data/entity-metadata';
import { defaultDataServiceConfig } from './data/data-service.config';
import { ShoppingItemDataService } from './services/shopping-item-data.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    entityDataService: EntityDataService,
    shoppingItemService: ShoppingItemDataService
  ) {
    entityDataService.registerService('ShoppingItem', shoppingItemService);
  }
}
