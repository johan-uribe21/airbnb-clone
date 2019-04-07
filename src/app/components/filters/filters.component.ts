import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {

  @Input() filterBarState;
  @Output() closeFilterDropdown = new EventEmitter<any>();
  @Output() toggleFilterDropdown = new EventEmitter<any>();
  @Output() applyFilters = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
