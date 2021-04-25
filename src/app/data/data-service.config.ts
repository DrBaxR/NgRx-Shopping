import { DefaultDataServiceConfig } from "@ngrx/data";

// fun fact: default behaviour for delete is optimistic (look at loading and when value actually changes)
export const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: 'http://localhost:3000',
    getDelay: 500,
    saveDelay: 500
}