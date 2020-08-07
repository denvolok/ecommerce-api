import { Controller } from "@nestjs/common";
import { User } from "./user.model";
import { Crud, CrudController } from "@nestjsx/crud";
import { UsersService } from "./users.service";
import { ApiController } from "../../utils/types";

@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ["password"],
  },
})
@Controller("api/users")
export class UsersController extends ApiController implements CrudController<User> {
  constructor(public service: UsersService) {
    super();
  }
}
