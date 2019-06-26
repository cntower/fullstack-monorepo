import { Controller, Get } from "@nestjs/common";

import { Message } from "@mono/api-interface";

import { AppService } from "./app.service";
import { ApiSwaggerOperation } from '../decorators/api-swagger-operation.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  @ApiSwaggerOperation()
  getData(): Message {
    return this.appService.getData();
  }
}
