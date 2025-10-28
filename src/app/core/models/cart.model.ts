import { Product } from "./product.model";

export interface Cart {
    Id: string;
    UserId: string;
    Products: Product[];
    TotalPrice: number;
    TotalQuantity: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}


export interface CartItemEntity {
    id: string; // product id
    title: string;
    image: string;
    price: number;
    quantity: number;
  }