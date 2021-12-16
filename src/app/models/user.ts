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
  role?: RoleEnum.USER | RoleEnum.ADMIN;
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
    department?: string,
    role?: RoleEnum.USER | RoleEnum.ADMIN,
    id?: number
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
    this.role = role ? role : undefined;
    this.id = id ? id : -1;
  }
}
