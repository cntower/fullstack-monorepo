import { Injectable } from "@nestjs/common";
import { Message } from "@mono/api-interface";

@Injectable()
export class AppService {
  getData(): Message {
    return { message: "Welcome to api!" };
  }
}
