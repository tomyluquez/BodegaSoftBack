import { Plan } from "../../plans/models/plan.model";

export class Tenant {
    Id!: number;
    Created_at!: Date;
    Name!: string;
    PlanId!: number;
    IsActive!: boolean;
    Plan!: Plan
}