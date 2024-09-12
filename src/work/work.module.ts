import { Module } from '@nestjs/common';
import { Test1234Controller } from './test1/controllers/test1234.controller';

@Module({
  controllers: [Test1234Controller]
})
export class WorkModule {}
