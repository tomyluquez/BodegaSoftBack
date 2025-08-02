import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { UserResponse } from "./models/user-response.model";
import { User } from "./models/user.model";
import supabase from "../../config/supabase-client";
import { TablesEnum } from "../../shared/enums/tables.enum";
import { LoginResponse } from "../auth/models/login-response.model";
import { authHelper } from "../auth/helpers/auth.helper";
import { IUserNameAndRoleId } from "./interface/user-name-and-role.interface";

export const getUserByUuidService = async (uuid: string): Promise<UserResponse> => {
    let response = new UserResponse();
    try {
        const { data: userData, error: userError }
            : { data: User | null, error: PostgrestError | null }
            = await supabase
                .from(TablesEnum.User)
                .select('*')
                .eq('UserId', uuid)
                .single();

        if (userError || !userData) {
            response.setError(userError?.message || 'Error al obtener los datos del usuario');
            return response;
        }

        response.User = userData;

    } catch (error: any) {
        response.setError(error.message);
        return response;
    }

    return response
};

export const getUserNameAndRoleByUuidService = async (uuid: string): Promise<IUserNameAndRoleId> => {
    let response = {} as { Name: string, Role: string };

    const { data: userData, error: userError }
        : PostgrestSingleResponse<IUserNameAndRoleId>
        = await supabase
            .from(TablesEnum.User)
            .select('Name, RoleId')
            .eq('UserId', uuid)
            .single();

    if (userError || !userData) {
        throw userError?.message || 'Error al obtener los datos del usuario';
    }

    return userData;

};