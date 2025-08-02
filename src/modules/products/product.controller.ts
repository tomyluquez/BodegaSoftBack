import { Request, Response } from "express";
import { ISearchProducts } from "./interfaces/products-search.interface";
import { PaginatedResponse } from "../../shared/models/paginated-response.model";
import { ProductListDTO } from "./DTOs/product-list.DTO";
import { getPaginatedProductsService } from "./product.service";
import { ICustomRequest } from "../../shared/interface/custom-request.interface";

export const getPaginatedProducts = async (req: ICustomRequest, res: Response) => {
    const searchTerm: ISearchProducts = req.body;
    try {
        const paginated = await getPaginatedProductsService(searchTerm);
        return res.status(200).json(paginated);
    } catch (error: any) {
        let response = new PaginatedResponse<ProductListDTO>();
        response.setError(error.message);
        return res.status(500).json(response);
    }
};