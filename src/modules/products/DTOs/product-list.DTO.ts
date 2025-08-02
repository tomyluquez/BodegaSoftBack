export class ProductListDTO {
    Id!: number;
    Code!: string;
    Name!: string;
    Description?: string;
    CategoryName!: string;
    Price!: number;
    Stock!: number;
    MinStock!: number;
    MaxStock!: number;
    IsActive!: boolean;
}