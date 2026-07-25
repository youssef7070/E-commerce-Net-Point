import { Brand } from "./brand.interface";
import { Category } from "./category.interface";
import { Subcategory } from "./subcategory.interface";

export interface Product {
    sold: number;
    images: string[];
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
}




