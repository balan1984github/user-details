import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  itemCountVal: number;
  pageSizeVal: number;
  pageCountVal: number;
  pageIndexVal: number;

  @Output() pageIndexChange = new EventEmitter();

  @Input() set itemCount(value) {
    this.itemCountVal = value;
    this.updatePageCount();
  }

  @Input() set pageSize(value) {
    this.pageSizeVal = value;
    this.updatePageCount();
  }

  @Input() set pageIndex(value) {
    this.pageIndexVal = value;
    this.pageIndexChange.emit(this.pageIndex);
  }

  constructor() {
    this.pageSize = 1;
  }

  ngOnInit() {
  }

  updatePageCount() {
    this.pageCountVal = Math.ceil(this.itemCount / this.pageSize);
  }

  get itemCount() {
    return this.itemCountVal;
  }

  get pageSize() {
    return this.pageSizeVal;
  }

  get pageIndex() {
    return this.pageIndexVal;
  }

  get canMoveToNextPage(): boolean {
    return this.pageIndex < this.pageCountVal - 1 ? true : false;
  }

  get canMoveToPreviousPage(): boolean {
    return this.pageIndex >= 1 ? true : false;
  }

  moveToNextPage() {
    if (this.canMoveToNextPage) {
      this.pageIndex++;
    }
  }

  moveToPreviousPage() {
    if (this.canMoveToPreviousPage) {
      this.pageIndex--;
    }
  }

  moveToLastPage() {
    this.pageIndex = this.pageCountVal - 1;
  }

  moveToFirstPage() {
    this.pageIndex = 0;
  }
}
