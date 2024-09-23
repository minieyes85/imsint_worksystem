import { Expose, Transform } from "class-transformer";
import { User } from "../entities/user.entity";

export class noticeListDto {

    @Expose()
    id: number;    
    
    @Expose()
    title: string;
    
    @Expose()
    is_pinned: boolean;
    
    @Expose()
    content: string;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    user_id: number;
    
    @Transform(({obj}) => obj.user.name)
    @Expose()
    user_name: string;

    @Expose()
    updatedAt: Date;
}