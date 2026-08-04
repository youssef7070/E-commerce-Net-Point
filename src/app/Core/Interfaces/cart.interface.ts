import { Brand } from "./brand.interface";
import { Category } from "./category.interface";
import { SubCategory } from "./subcategory.interface";

export interface CartResponse {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: Cart;
}

export interface Cart {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface CartProduct {
    _id: string;
    count: number;
    price: number;
    product: Product;
}

export interface Product {
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    ratingsAverage: number;
    id: string;
    subcategory: SubCategory[];
    category: Category;
    brand: Brand;
}