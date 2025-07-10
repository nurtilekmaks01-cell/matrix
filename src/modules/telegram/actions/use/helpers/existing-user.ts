import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'telegraf/typings/core/types/typegram';

interface IExistingUserArgs {
  userService: UserService;
  from: User;
}
export const ensureUserExists = async (args: IExistingUserArgs) => {
  const { userService, from } = args;

  const telegram_id = String(from.id);

  let user = await userService.findOneWithOptions({ where: { telegram_id } });

  if (!user) {
    const createUserDto: CreateUserDto = {
      telegram_id,
      first_name: from.first_name,
      last_name: from.last_name,
      username: from.username,
    };

    user = await userService.create(createUserDto);
  }

  return user;
};
