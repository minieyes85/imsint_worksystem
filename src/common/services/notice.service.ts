import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
    constructor(@InjectRepository(Notice) private noticeRepo: Repository<Notice>) {}

    async loadListNotice(){
        return await this.noticeRepo.find({relations: ['user'],});
    }
}
