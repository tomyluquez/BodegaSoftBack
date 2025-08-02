import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../../config/supabase-client";
import { StockAlarmEnum } from "../../shared/enums/stock-alarm.enum";
import { TablesEnum } from "../../shared/enums/tables.enum";
import { PaginatedResponse } from "../../shared/models/paginated-response.model";
import { ProductListDTO } from "./DTOs/product-list.DTO";
import { mapProductHelper } from "./helpers/map-products";
import { ISearchProducts } from "./interfaces/products-search.interface";
import { Product } from './models/product.model';
import { tenantHelper } from "../../shared/helpers/tenant.helper";
import { paginatedHelper } from "../../shared/helpers/paginated.helper";

export const getPaginatedProductsService = async (searchTerm: ISearchProducts): Promise<PaginatedResponse<ProductListDTO>> => {
    let response = new PaginatedResponse<ProductListDTO>();
    try {
        let query = supabase
            .from(TablesEnum.Products)
            .select(
                `
        *,
        Category:CategoryId (
          Name
        )
      `,
                { count: 'exact' }
            );

        //Filtrado por tenant -- TODO: traer el tenant del token --
        query = tenantHelper.filterByTenant(query, 1);

        // Filtros
        if (searchTerm.Name) query = query.ilike('Name', `%${searchTerm.Name}%`);
        if (searchTerm.CategoryId) query = query.eq('CategoryId', searchTerm.CategoryId);
        if (searchTerm.IsActive !== undefined) query = query.eq('IsActive', searchTerm.IsActive);
        if (searchTerm.StockState) {
            const stockState = Number(searchTerm.StockState);

            if (stockState === StockAlarmEnum.NoStock) {
                query = query.eq('Stock', 0);
            }

            if (stockState === StockAlarmEnum.LowStock) {
                query = query.lt('Stock', 'MinStock'); // Stock < MinStock
            }

            if (stockState === StockAlarmEnum.InStock) {
                // Stock > MinStock AND Stock < MaxStock
                query = query.gt('Stock', 'MinStock').lt('Stock', 'MaxStock');
            }

            if (stockState === StockAlarmEnum.Ideal) {
                query = query.gt('Stock', 'MaxStock'); // Stock > MaxStock
            }
        }

        // Paginación
        query = paginatedHelper.paginated(query, searchTerm.PageNumber, searchTerm.PageSize);

        const { data, error, count } = await query as PostgrestSingleResponse<Product[]>;

        if (error) {
            response.setError(error.message);
            return response;
        }

        // Mapear respuesta
        const items: ProductListDTO[] =
            data?.map(p => mapProductHelper.mapProductListToDTO(p)) ?? [];

        response.Items = items;
        response.TotalItems = count ?? 0;
        return response;

    } catch (error: any) {
        response.setError(error.message);
        return response;
    }

    return response;
}