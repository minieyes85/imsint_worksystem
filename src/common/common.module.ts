import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './services/menu.service';
import { MainController } from './controllers/main.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CommonController, MainController],
  providers: [MenuService, UserService, AuthService],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
