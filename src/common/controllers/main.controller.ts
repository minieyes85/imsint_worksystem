import { Controller, Get, Render, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { PageRenderDto } from '../dtos/page-render.dto';

@Controller()
export class MainController {
  constructor(
    private configService: ConfigService,
  ) {}

  @Get()
  root(@Session() session: any, @Res() res: Response) {
    if (session.user) {
      return res.redirect('/notice');
    } else {
      return res.redirect('/common/signin');
    }
  }

  @Get('notice')
  noticePage(@Session() session: any, @Res() res: Response) {

    const renderObj: PageRenderDto = {};
    renderObj.layout = "layouts/layoutService";
    renderObj.company_name  = this.configService.get("COMPANY_NAME");
    renderObj.menu = session.menu;
    renderObj.user = session.user;

    res.render("services/notice", renderObj)
  }

  @Get('menu')
  menuPage(@Session() session: any, @Res() res: Response) {

    const renderObj: PageRenderDto = {};
    renderObj.layout = "layouts/layoutService";
    renderObj.company_name  = this.configService.get("COMPANY_NAME");
    renderObj.menu = session.menu;
    renderObj.user = session.user;

    res.render("services/menu", renderObj)
  }
}
