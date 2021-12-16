import {User} from "../models/user";
import {RoleEnum} from "../enums/role.enum";

export const UserMock: User[] = [
  {
    companyName: 'GoldenPay',
    mobile: 994515130696,
    address: 'Mir Celal 1',
    userName: 'Alixan - admin',
    email: 'alikhan-gusejjnv@list.ru',
    password: 'Qq()1852439',
    role: RoleEnum.ADMIN,
    lastLogin: 1639674554567,
    id: 0,
  },
  {
    companyName: 'GoldenPay',
    mobile: 994556437953,
    address: 'Cefer Cabbarli 95',
    userName: 'Alixan useruser',
    email: 'name.qwerty21@mail.ru',
    password: 'Qq()1852439',
    role: RoleEnum.USER,
    lastLogin: 1639674536458,
    id: 1,
  }
]
