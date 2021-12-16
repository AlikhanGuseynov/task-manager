import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ToastTypeEnum} from "../enums/toast-type.enum";

export interface ToastData {
  state: boolean;
  text?: string;
  type?: ToastTypeEnum;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast$: BehaviorSubject<ToastData> = new BehaviorSubject<ToastData>({
    state: false,
    text: 'string'
  })
  customTimeOut: any;

  constructor() {
  }

  createToast(text?: string, type?: ToastTypeEnum, durationMs?: number) {
    text = text ? text : 'SUCCESS';
    this.toast$.next({state: true, text, type})
    this.customTimeOut = setTimeout(() => {
      this.toast$.next({state: false, text})
    }, durationMs ? durationMs : 3000)
  }

  deleteToast() {
    clearTimeout(this.customTimeOut);
    this.toast$.next({state: false, text: ''});
  }

  getToast(): Observable<ToastData> {
    return this.toast$.asObservable();
  }

}
