import { Controller, Get, Render, Res, Session } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class MainController {
  @Get()
  root(@Session() session: any, @Res() res: Response) {
    if (session.user) {
      return res.redirect('/main');
    } else {
      return res.redirect('/common/signin');
    }
  }  

  @Get('main')
  @Render('main')
  mainPage() {
    return {};
  }
}
