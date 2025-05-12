import { Product } from "../App";

interface AddedAction {
  type: "added";
  product: Product;
}
interface DeletedAction {
  type: "deleted";
  id: number;
}
interface LoadedAction {
  type: "loaded";
  products: Product[];
}

export type Action = AddedAction | DeletedAction | LoadedAction;

export default function productsReducer(
  products: Product[],
  action: Action
): Product[] {
  switch (action.type) {
    case "loaded": {
      return action.products;
    }
    case "added": {
      return [...products, { ...action.product }];
    }
    case "deleted": {
      return products.filter((p) => p.id !== action.id);
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
