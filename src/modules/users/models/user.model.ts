import { Role } from "../../roles/models/role.model";
import { Tenant } from "../../tenants/models/tenant.model";

export class User {
    Id!: number;
    UserId!: string;
    Created_at!: Date;
    Name!: string;
    Emial!: string;
    RoleId!: number;
    Role!: Role;
    Tenant!: Tenant[];
    IsActive!: boolean;
}