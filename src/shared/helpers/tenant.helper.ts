import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { GenericSchema } from "@supabase/postgrest-js/dist/cjs/types";


class TenantHelper {

    public filterByTenant<
        Schema extends GenericSchema,
        Row extends Record<string, any> = any,
        Result = Row,
        RelationName extends string = string
    >(
        query: PostgrestFilterBuilder<Schema, Row, Result>,
        tenantId: number,
    ): PostgrestFilterBuilder<Schema, Row, Result, RelationName> {
        return query.eq('TenantId', tenantId as any);
    }

}

export const tenantHelper = new TenantHelper();