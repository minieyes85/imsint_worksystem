import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './services/menu.service';
import { MainController } from './controllers/main.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { Menu } from './entities/menu.entity';
import { NoticeService } from './services/notice.service';
import { Notice } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Menu, Notice])],
  controllers: [CommonController, MainController],
  providers: [MenuService, UserService, AuthService, NoticeService],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
