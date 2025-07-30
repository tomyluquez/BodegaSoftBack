import { Role } from "../../roles/models/role.model";
import { Tenant } from "../../tenants/models/tenant.model";

export class User {
    Id!: number;
    Created_at!: Date;
    Name!: string;
    Emial!: string;
    RoleId!: number;
    Role!: Role;
    Password!: string;
    TenantId!: number;
    Tenant!: Tenant;
    IsActive!: boolean;
}