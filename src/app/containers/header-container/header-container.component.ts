import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

export type HomeTypes = 'Entire apartment' | 'Private room' | 'Tree house' | 'Hotel room';

export interface Filters {
  homeType: Array<HomeTypes>;
}

export interface FilterBarState {
  homeType: { open: boolean; filters: Array<HomeTypes> };
}

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.less']
})
export class HeaderContainerComponent implements OnInit {
  listings$: Observable<{}>;
  filterBarState$ = new BehaviorSubject<FilterBarState>({ homeType: { open: false, filters: [] } });

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

    this.dataService.getCurrentFilters$().subscribe(filters => {
      const filterBarState = this.filterBarState$.getValue();
      filterBarState.homeType.filters = filters.homeType;
      this.filterBarState$.next(filterBarState);
    });

  }

  toggleFilterDropdown(filter: string) {

    const filters = this.filterBarState$.getValue();
    filters[filter].open = !filters[filter].open;
    this.filterBarState$.next(filters);

  }

  closeFilterDropdown(filter: string) {

    const filters = this.filterBarState$.getValue();
    filters[filter].open = false;
    this.filterBarState$.next(filters);

  }

  applyFilters(filters: Filters) {

    this.closeFilterDropdown('homeType');

    this.router.navigate(['homes'], { queryParams: { 'home-type': filters.homeType } });

    this.dataService.loadListings(filters);

  }

}
