export class ProductEditorDTO {
    Id!: number;
    TenantId!: number;
    Name!: string;
    Description?: string;
    Code!: string;
    CategoryId!: number;
    Cost!: number;
    Price!: number;
    Stock!: number;
    MinStock!: number;
    MaxStock!: number;
    IsActive!: boolean;
}