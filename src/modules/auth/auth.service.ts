import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../../config/supabase-client";
import { TablesEnum } from "../../shared/enums/tables.enum";
import { ResponseMessages } from "../../shared/models/response-messages.model";
import { User } from "../users/models/user.model";
import { authHelper } from "./helpers/auth.helper";
import { IAuthLogin } from "./interface/auth-login.interface";
import { IAuthRegister } from "./interface/auth-register.interface";
import { AuthLoginResponse } from "./models/auth-login-response";
import { getUserByUuidService, getUserNameAndRoleByUuidService } from "../users/user.service";
import { getInfoTenantsByUserIdService, getTenantIdsByUserIdService } from "../tenants/tenants.service";
import { LoginResponse } from "./models/login-response.model";

//revisar porque no se guard en auth pero si en users
export const registerUserService = async (register: IAuthRegister): Promise<ResponseMessages> => {
    let response = new ResponseMessages();

    try {

        // 1. Crear usuario en Supabase Auth 
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: register.Email,
            password: register.Password,
        });

        if (authError || !authData?.user) {
            response.setError(authError?.message || 'Error al registrar el usuario');
            return response;
        }

        const userId = authData.user.id;

        // 2. Guardar datos personalizados en tu tabla Users
        const { error: insertUserError } = await supabase.from(TablesEnum.User).insert([
            {
                UserId: userId,
                Name: register.Name,
                Email: register.Email,
                RoleId: register.RoleId,
                IsActive: true,
            },
        ]);

        if (insertUserError) {
            //Hacemos rollback manualmente de la transaccion
            await supabase.auth.admin.deleteUser(userId);
            response.setError(insertUserError.message);
            return response;
        }

        // 3. Guardar datos personalizados en la tabla userTenants
        let insertUserTenantsError: PostgrestError | null = null;
        if (register.TenantIds && register.TenantIds.length > 0) {
            for (let tenantId of register.TenantIds) {
                const { error } = await supabase.from(TablesEnum.UserTenants).insert([
                    {
                        UserId: userId,
                        TenantId: tenantId,
                    },
                ]);

                if (error) {
                    insertUserTenantsError = error;
                    break;
                }
            }
        }

        if (insertUserTenantsError) {
            //Hacemos rollback manualmente de la transaccion
            await supabase.auth.admin.deleteUser(userId);
            await supabase.from(TablesEnum.User).delete().eq('UserId', userId);
            response.setError(insertUserTenantsError.message);
            return response;
        }

        response.setSuccess('Usuario registrado correctamente');
    } catch (error: any) {
        response.setError(error.message);
        return response;
    }
    return response;
}

export const loginUserService = async (login: IAuthLogin): Promise<AuthLoginResponse> => {
    let response = new AuthLoginResponse();
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: login.Email,
            password: login.Password,
        });

        if (error) {
            response.setError(error.message);
            return response;
        }

        // Devolvemos los tenants asosciados al user
        response.TenantIds = await getInfoTenantsByUserIdService(data.user.id);
        response.setSuccess('Usuario logueado correctamente');
    } catch (error: any) {
        response.setError(error.message);
        return response;
    }
    return response;
}

export const selectCompanyAndLoginService = async (tenantName: string, tenantId: number, userId: string): Promise<LoginResponse> => {
    let response = new LoginResponse();
    try {
        const userResponse = await getUserNameAndRoleByUuidService(userId);

        if (!userResponse) {
            response.setError('Error al obtener los datos del usuario');
            return response;
        }

        response.Token = authHelper.generateToken(userId, userResponse.Name, userResponse.RoleId, tenantId);
        response.CompanyName = tenantName;

    } catch (error: any) {
        response.setError(error.message);
        return response;
    }

    return response;
} 