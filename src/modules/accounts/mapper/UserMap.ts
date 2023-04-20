import { instanceToInstance } from "class-transformer";

import { IUserReponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_licence,
    avatar_url,
  }: User): IUserReponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_licence,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
