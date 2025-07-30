import { Tenant } from "../../tenants/models/tenant.model";

export class Customer {
    Id!: number;
    Created_at!: Date;
    Name!: string;
    Phone?: number;
    Email?: string;
    Address?: string;
    TenantId!: number;
    Tenant!: Tenant
    IsActive!: boolean;
}