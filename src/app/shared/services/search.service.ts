
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class SearchService {
  private search = new Subject<string>()
  public search$: Observable<any>

  constructor() {
    this.search$ = this.search.asObservable()
  }

  setSearch(text: string) {
    this.search.next(text)
  }
} 