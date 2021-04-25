import { EntityMetadataMap } from "@ngrx/data";

// it's done like this to showcase how to configure stuff manually
const entityMetadata: EntityMetadataMap = {
    ShoppingItem: { entityName: 'Shoppingz' },
};

const pluralNames = {
    Shoppingz: 'Shoppingz'
}

export const entityConfig = {
    entityMetadata,
    pluralNames
}