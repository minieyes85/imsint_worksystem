import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Session,
  Res,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { MenuService } from '../services/menu.service';
import { NoticeService } from '../services/notice.service';
import { noticeListDto } from '../dtos/notice-list.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('common')
export class CommonController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private menuService: MenuService,
    private noticeService: NoticeService,
  ) {}
  //   @Get()
  //   @Render('index')
  //   root() {
  //     return { message: 'check out' };
  //   }

  @Get('signin')
  signInPage(@Res() res: Response) {
    res.render('signin', { layout: false });
  }

  @Post('signin')
  async signin(
    @Body() body: CreateUserDto,
    @Session() session: any,
    @Res() res: Response,
  ) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    session.user = user;

    // menu info

    session.menu = await this.menuService.loadMenu();

    console.log(session.menu);

    return res.redirect('/');
  }

  @Get('signup')
  signUpPage(@Res() res: Response) {
    res.render('signup', { layout: false });
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

    return { user };
  }

  @Get('signout')
  @Redirect('/')
  signOut(@Session() session: any, @Res() res: Response) {
    session.userId = null;
    session.user = null;
    return;
  }

  @Post('menu')
  loadMenu() {
    return this.menuService.loadMenu();
  }

  @Post('notice')
  @Serialize(noticeListDto)
  listNotice() {
    return this.noticeService.loadListNotice()
  }



}
