import { ProductListDTO } from "../DTOs/product-list.DTO";
import { Product } from "../models/product.model";

class MapProductHelper {


    mapProductListToDTO(p: Product): ProductListDTO {
        return {
            Id: p.Id,
            Code: p.Code,
            Name: p.Name,
            Description: p.Description,
            CategoryName: p.Category?.Name ?? '',
            Price: p.Price,
            Stock: p.Stock,
            MinStock: p.MinStock,
            MaxStock: p.MaxStock,
            IsActive: p.IsActive,
        }
    }
}

export const mapProductHelper = new MapProductHelper();