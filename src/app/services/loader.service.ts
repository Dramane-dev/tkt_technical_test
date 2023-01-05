import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loaderStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor() {}

  public getLoaderStatus(): Observable<boolean> {
    return new Observable((observer) =>
      observer.next(this._loaderStatus$.value)
    );
  }
}
