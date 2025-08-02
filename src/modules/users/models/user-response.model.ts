import { ResponseMessages } from "../../../shared/models/response-messages.model";
import { User } from "./user.model";

export class UserResponse extends ResponseMessages {
    User?: User
}