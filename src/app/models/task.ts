import {TaskStatusEnum} from "../enums/task-status.enum";
import {User} from "./user";

export class Task {
  id: number;
  companyId: number;
  title: string;
  description: string;
  deadline: number;
  status: TaskStatusEnum;
  creator: User;
  performers: User[];

  constructor(
    id?: number,
    companyId?: number,
    title?: string,
    description?: string,
    deadline?: number,
    status?: TaskStatusEnum,
    creator?: User,
    performers?: User[],
  ) {
    this.id = id ? id : -1
    this.companyId = companyId ? companyId : -1
    this.title = title ? title : ''
    this.description = description ? description : ''
    this.deadline = deadline ? deadline : -1
    this.status = status ? status : -1
    this.creator = creator ? creator : new User()
    this.performers = performers ? performers : [new User()]
  }

}
