import { ResponseMessages } from "../../../shared/models/response-messages.model";

export class LoginResponse extends ResponseMessages {
    Token!: string;
    CompanyName!: string;
}