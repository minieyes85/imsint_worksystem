import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Controller('common')
export class CommonController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  //   @Get()
  //   @Render('index')
  //   root() {
  //     return { message: 'check out' };
  //   }

  @Get('signin')
  @Render('signin')
  signInPage() {
    return {};
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any){
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('signup')
  @Render('signup')
  signUpPage() {
    return {};
  }

  @Post('signup')
  @Render('signup_result')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.name,
    );
    session.userId = user.id;

    return {user};
  }
}
