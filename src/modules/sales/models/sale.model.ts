import { Customer } from "../../customers/models/customer.model";
import { Tenant } from "../../tenants/models/tenant.model";
import { User } from "../../users/models/user.model";

export class Sale {
    Id!: number;
    Created_at!: Date;
    SaleNumber!: string;
    TenantId!: number;
    Tenant!: Tenant;
    UserId!: number;
    User!: User;
    CustomerId!: number;
    Customer!: Customer;
    Subtotal!: number;
    Total!: number;
    Discount!: number;
    IsActive!: boolean;
}