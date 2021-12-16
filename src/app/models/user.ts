import {RoleEnum} from "../enums/role.enum";

export interface User {
  companyName: string;
  mobile: number;
  address: string;
  userName: string;
  email: string;
  password: string;
  role?: RoleEnum.USER | RoleEnum.ADMIN;
  id: number;
}
