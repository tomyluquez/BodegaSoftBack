import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../../config/supabase-client";
import { TablesEnum } from "../../shared/enums/tables.enum";
import { ITenantInfo } from "./interfaces/tenant-info.interface";

export const getTenantIdsByUserIdService = async (userId: string): Promise<number[]> => {
    let response = [] as number[];
    try {
        const { data, error }: PostgrestSingleResponse<{ TenantId: number }[]> = await supabase
            .from(TablesEnum.UserTenants)
            .select('TenantId')
            .eq('UserId', userId);

        if (error || !data) throw error;

        response = data.map((item) => item.TenantId);

    } catch (error: any) {
        throw error;
    }

    return response;
}

export const getInfoTenantsByUserIdService = async (userId: string): Promise<ITenantInfo[]> => {
    try {
        const { data, error }: PostgrestSingleResponse<{ Tenant: ITenantInfo[] }[]> = await supabase
            .from(TablesEnum.UserTenants)
            .select('Tenant:TenantId(Id, Name)')
            .eq('UserId', userId);
        if (error || !data) throw error;

        return (data ?? []).flatMap(d => d.Tenant);

    } catch (error: any) {
        throw error;
    }
};

