import {RoleEnum} from "../enums/role.enum";

export interface UserInterface {
  companyName: string;
  companyId: number;
  mobile: number;
  address: string;
  userName: string;
  surname?: string;
  email: string;
  password: string;
  position?: string;
  department?: string;
  lastLogin?: number;
  role?: RoleEnum.USER | RoleEnum.ADMIN;
  id: number;
  taskCounter?: number;
  solvedTaskCounter?: number;
}
