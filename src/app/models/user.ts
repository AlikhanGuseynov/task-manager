import {RoleEnum} from "../enums/role.enum";

export class User {
  companyName: string;
  companyId: number;
  mobile: number;
  address: string;
  userName: string;
  surname?: string;
  email: string;
  password: string;
  position?: string;
  accountCreator?: boolean;
  department?: string;
  lastLogin?: number;
  role?: RoleEnum;
  id: number;

  constructor(
    companyName?: string,
    mobile?: number,
    address?: string,
    userName?: string,
    surname?: string,
    email?: string,
    password?: string,
    position?: string,
    accountCreator?: boolean,
    department?: string,
    lastLogin?: number,
    role?: RoleEnum,
    id?: number,
    companyId?: number,
  ) {
    this.companyName = companyName ? companyName : '';
    this.companyId = companyId ? companyId : -1;
    this.mobile = mobile ? mobile : 994;
    this.address = address ? address : '';
    this.userName = userName ? userName : '';
    this.surname = surname ? surname : '';
    this.email = email ? email : '';
    this.password = password ? password : '';
    this.position = position ? position : '';
    this.accountCreator = accountCreator ? accountCreator : false;
    this.department = department ? department : '';
    this.lastLogin = lastLogin ? lastLogin : -1;
    this.role = role ? role : undefined;
    this.id = id ? id : -1;
  }

}
