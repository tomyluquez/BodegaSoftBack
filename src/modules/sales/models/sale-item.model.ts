import { Product } from "../../products/models/product.model";
import { Sale } from "./sale.model";

export class SaleItem {
    Id!: number;
    Created_at!: Date;
    SaleId!: number;
    Sale!: Sale;
    ProductId!: number;
    Product!: Product;
    Quantity!: number;
    UnitPrice!: number;
    Discount!: number;
}