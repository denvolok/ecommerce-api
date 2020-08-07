import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRole } from "../users/user.model";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Injectable()
export class ApiGuard extends JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = [UserRole["ADMIN"], UserRole["EMPLOYEE"]];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role);
  }
}
