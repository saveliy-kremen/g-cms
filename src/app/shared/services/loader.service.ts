
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class LoaderService {
  private loaderState = new Subject<boolean>()
  public loader$: Observable<any>

  constructor() {
    this.loader$ = this.loaderState.asObservable()
  }

  showLoader() {
    this.loaderState.next(true)
  }

  hideLoader() {
    this.loaderState.next(false)
  }
} 