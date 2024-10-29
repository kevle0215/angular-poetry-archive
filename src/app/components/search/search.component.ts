import { Component, inject, signal } from '@angular/core';
import { FetchDataService } from '../../service/fetchdata.service';
import { catchError, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PoemResponse } from '../../model/PoemResponse.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})

export class SearchComponent {
  author: string = "";
  title: string = "";
  lines: number | null = null;

  fetchDataService = inject(FetchDataService);
  data = signal<Array<PoemResponse> | null>(null);

  search(): void {
    const linecount = this.lines !== null ? this.lines : undefined;
    this.fetchDataService
      .fetchData(this.author, this.title, linecount)
      .pipe(
        map((res) => {
          res.sort((a,b) => {
            return a.title.localeCompare(b.title);
          })
          return res;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((val) => {
        this.data.set(val);
      });
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
