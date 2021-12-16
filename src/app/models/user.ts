import {RoleEnum} from "../enums/role.enum";

export class User {
  companyName: string;
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

  constructor(
    companyName?: string,
    mobile?: number,
    address?: string,
    userName?: string,
    surname?: string,
    email?: string,
    password?: string,
    position?: string,
    department?: string,
    lastLogin?: number,
    role?: RoleEnum.USER | RoleEnum.ADMIN,
    id?: number,
    taskCounter?: number,
    solvedTaskCounter?: number,
  ) {
    this.companyName = companyName ? companyName : '';
    this.mobile = mobile ? mobile : -1;
    this.address = address ? address : '';
    this.userName = userName ? userName : '';
    this.surname = surname ? surname : '';
    this.email = email ? email : '';
    this.password = password ? password : '';
    this.position = position ? position : '';
    this.department = department ? department : '';
    this.lastLogin = lastLogin ? lastLogin : -1;
    this.role = role ? role : undefined;
    this.id = id ? id : -1;
    this.taskCounter = id ? id : 0;
    this.solvedTaskCounter = id ? id : 0;
  }
}
