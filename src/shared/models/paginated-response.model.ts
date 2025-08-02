import { ResponseMessages } from "./response-messages.model";

export class PaginatedResponse<T> extends ResponseMessages {
    Items: T[] = [];
    TotalItems: number = 0;
    PageNumber: number = 0;
    PageSize: number = 0;
}