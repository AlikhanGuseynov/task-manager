import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
export class CustomSelectComponent implements OnInit {

  @Input() list: ISelect;
  @Input() multiSelect = false;
  @Input() defaultSelectedIndex: any[];
  @Output() select: EventEmitter<any[]> = new EventEmitter<any[]>();
  filterInput = '';
  selectedList: ISelectItem[] = [];
  selectIsOpen = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initSelect();
  }

  ngOnChanges(): void {
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
    if (!this.multiSelect) {
      this.select.emit(this.selectedList);
      this.selectedList = [];
    }
  }

  deleteFromList(event: any): void {
    this.selectedList = this.selectedList.filter((e: any) => {
      return e.value !== event.value;
    });
  }

  initSelect(): void {
    this.list?.list?.forEach(item => {
      item.checked = false;
    });
    this.list?.list?.forEach(item => {
      this.defaultSelectedIndex?.map(e => {
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

  save(): void {
    this.select.emit(this.selectedList);
  }


}
