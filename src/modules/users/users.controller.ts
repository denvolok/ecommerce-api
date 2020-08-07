import { Controller } from "@nestjs/common";
import { User } from "./user.entity";
import { Crud, CrudController } from "@nestjsx/crud";
import { UsersService } from "./users.service";
import { ApiController } from "../../utils/types";
import { ApiTags } from "@nestjs/swagger";

@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ["password"],
  },
  routes: {
    exclude: ["createManyBase"],
  },
})
@Controller("api/users")
@ApiTags("users")
export class UsersController extends ApiController implements CrudController<User> {
  constructor(public service: UsersService) {
    super();
  }
}
