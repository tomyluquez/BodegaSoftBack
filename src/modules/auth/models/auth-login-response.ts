import { ResponseMessages } from "../../../shared/models/response-messages.model";
import { ITenantInfo } from "../../tenants/interfaces/tenant-info.interface";

export class AuthLoginResponse extends ResponseMessages {
    TenantIds!: ITenantInfo[];
}