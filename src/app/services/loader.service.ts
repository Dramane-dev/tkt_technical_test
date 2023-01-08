import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderServices {
  private _loaderStatus$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor() {}

  public getLoaderStatus(): Observable<boolean> {
    return this._loaderStatus$;
  }

  public setLoaderStatus(newLoaderStatus: boolean): void {
    this._loaderStatus$.next(newLoaderStatus);
  }
}
