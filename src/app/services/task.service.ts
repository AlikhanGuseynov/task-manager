import {Injectable} from '@angular/core';
import {Task} from "../models/task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {TaskMock} from "../mocks/task.mock";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: Task[] = [...TaskMock];
  taskList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([...TaskMock])

  companyTaskList$: Subject<Task[]> = new Subject<Task[]>()

  constructor(
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(e => {
      // @ts-ignore
      this.getCompanyTaskList(e.companyId)
    })
  }

  // @ts-ignore
  getCompanyTaskList(companyId: number): Observable<Task[]> {
    this.getTasks().pipe(
      map(results => results.filter(r => r.companyId === companyId))
    ).subscribe(event => {
      return new BehaviorSubject(event).asObservable();
    })
  }

  getTasks(): Observable<Task[]> {
    return this.taskList$.asObservable();
  }


}
