import { Category } from "../../categories/models/category.model";
import { Tenant } from "../../tenants/models/tenant.model";

export class Product {
    Id!: number;
    Created_at!: Date;
    TenantId!: number;
    Tenant!: Tenant;
    Name!: string;
    Code!: string;
    CategoryId!: number;
    Category!: Category;
    Price!: number;
    Stock!: number;
    IsActive!: boolean;
}