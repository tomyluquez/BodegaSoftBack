export interface ISearchProducts {
    Name?: string;
    CategoryId?: string;
    IsActive?: boolean;
    StockState?: number;
    PageNumber: number;
    PageSize: number;
}