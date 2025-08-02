import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { GenericSchema } from "@supabase/postgrest-js/dist/cjs/types";

class PaginatedHelper {

    public paginated<
        Schema extends GenericSchema,
        Row extends Record<string, any> = any,
        Result = Row
    >(
        query: PostgrestFilterBuilder<Schema, Row, Result>,
        page: number,
        pageSize: number
    ): PostgrestFilterBuilder<Schema, Row, Result> {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        return query.range(from, to);
    }
}

export const paginatedHelper = new PaginatedHelper();