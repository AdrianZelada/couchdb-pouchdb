import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {

  @Input() list: Array<any> = [];
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  updateState(item) {
    this.change.emit(item);
  }
}
