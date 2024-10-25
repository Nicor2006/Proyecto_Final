import { Component } from '@angular/core';
import { SearchService } from '../../../servicios/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
})
export class SearchBarComponent {
  constructor(private searchService: SearchService) {}

  onSearch(query: string): void {
    this.searchService.setSearchQuery(query);
  }
}