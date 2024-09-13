import { User } from "../entities/user.entity";

export class PageRenderDto {
    layout?:string;
    company_name?: string;
    menu?: any;
    user?: User;
}