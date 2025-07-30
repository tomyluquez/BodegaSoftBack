import { Tenant } from "../../tenants/models/tenant.model";

export class Category {
    Id!: number;
    Created_at!: Date;
    Name!: string;
    TenantId!: number;
    Tenant!: Tenant
    IsActive!: boolean;
}