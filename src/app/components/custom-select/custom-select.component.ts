import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

export interface ISelect {
  list: ISelectItem[];
  defaultChecked?: number[] | string[];
}

export interface ISelectItem {
  value: number | string,
  displayText: string;
  checked?: boolean;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnChanges {

  @Input() list: ISelect;
  @Input() defaultSelected: number[] | string[] = [];
  @Input() error: boolean;
  @Output() selectEvent: EventEmitter<ISelectItem[]> = new EventEmitter<ISelectItem[]>();
  filterInput = '';
  selectedList: ISelectItem[] = [];
  selectIsOpen = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initSelect();
  }

  ngOnChanges() {
    this.initSelect();
  }

  search(event: any): void {
    this.filterInput = event.target.value;
  }

  filter(text: string): boolean {
    return text.toLowerCase().includes(this.filterInput.toLowerCase());
  }

  checkboxHandle(event: any, item: any) {
    if (event.target.checked) {
      this.selectedList.push(item);
    } else {
      this.selectedList = this.selectedList.filter((e: any) => {
        return e.value !== item.value;
      });
    }
    this.selectEvent.emit(this.selectedList);
  }

  deleteFromList(event: any): void {
    this.selectedList = this.selectedList.filter((e: any) => {
      return e.value !== event.value;
    });
    this.selectEvent.emit(this.selectedList);
  }

  initSelect(): void {
    this.list?.list?.forEach(item => {
      item.checked = false;
    });
    this.list?.list?.forEach(item => {
      this.defaultSelected?.map((e: number | string) => {
        if (item.value === e) {
          this.selectedList.push(item);
        }
      });
    });
  }

  isChecked(item: any): boolean {
    return this.selectedList.some((e: any) => {
      return e.value === item.value;
    });
  }

}
