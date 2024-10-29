import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PoemResponse } from '../model/PoemResponse.type';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  http = inject(HttpClient);

  fetchData(author: string, title: string, linecount?: number) { 

    let url = `https://poetrydb.org/`;

    if (author) url += "author";
    if (title) url += author ? ",title" : "title";
    if (linecount !== undefined) url += (author || title) ? ",linecount" : "linecount";

    if (author) url += `/${author}`;
    if (title) url += `;${title}`;
    if (linecount !== undefined) url += `;${linecount}`;
      
    url += "/author,title,lines";

    return this.http.get<Array<PoemResponse>>(url);
  }
}
