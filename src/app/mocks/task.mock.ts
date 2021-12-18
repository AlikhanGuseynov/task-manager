import {Task} from "../models/task";
import {TaskStatusEnum} from "../enums/task-status.enum";
import {User} from "../models/user";
import {UserMock} from "./user.mock";

export const TaskMock: Task[] = [
  {
    id: 0,
    companyId: 987,
    title: 'Lorem 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur illum inventore laudantium, possimus qui quos similique. Delectus deserunt eaque illo ipsam quo reiciendis sapiente.',
    deadline: 1639698153860,
    status: TaskStatusEnum.NEW,
    creator: UserMock[0],
    createDate: 1628568153860,
    performers: [UserMock[1], UserMock[2], UserMock[3]],
  },
  {
    id: 2,
    companyId: 123,
    title: 'Lorem 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adpsam quo reiciendis sapiente.',
    deadline: 1639689331966,
    status: TaskStatusEnum.DONE,
    creator: UserMock[2],
    createDate: 1628568153860,
    performers: [UserMock[1], UserMock[3]],
  },
  {
    id: 3,
    companyId: 987,
    title: 'Lorem 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur illum inventore laudantium, possimus qui quos similique. Delectus deeiciendis sapiente.',
    deadline: 1639689331966,
    status: TaskStatusEnum.UAT,
    creator: UserMock[0],
    createDate: 1628568153860,
    performers: [UserMock[1], UserMock[2]],
  },
  {
    id: 4,
    companyId: 123,
    title: 'Lorem 4',
    description: 'Lorem ipsum dolor sit amet, co, possimus qui quos similique. Delectus deserunt eaque illo ipsam quo reiciendis sapiente.',
    deadline: 1639689331966,
    status: TaskStatusEnum.IN_PROGRESS,
    creator: UserMock[1],
    createDate: 1628568153860,
    performers: [UserMock[2], UserMock[3]],
  },
  {
    id: 5,
    companyId: 123,
    title: 'Lorem 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur possimus qui quos similique. Delectus deserunt eaque illo ipsam quo reiciendis sapiente.',
    deadline: 1639689331966,
    status: TaskStatusEnum.UAT,
    creator: UserMock[0],
    createDate: 1628568153860,
    performers: [UserMock[3]],
  },
]
