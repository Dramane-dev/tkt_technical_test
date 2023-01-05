import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  from,
  map,
  Observable,
  of,
} from 'rxjs';
import { EApiEndpoints } from '../enum/EApiEndpoints';
import { ICompany } from '../interfaces/ICompany';
import { AxiosService } from './axios.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyServices {
  private _companies = new BehaviorSubject<ICompany[]>([]);
  private _axiosInstance: AxiosInstance;
  private _loaderStatus: boolean = false;

  constructor(
    private _axiosService: AxiosService,
    private _loaderService: LoaderService
  ) {
    this._axiosInstance = this._axiosService.getInstance();
  }

  public getCompanies(): Observable<ICompany[]> {
    return new Observable((observer) => {
      this._loaderService
        .getLoaderStatus()
        .subscribe((loaderStatus) => (this._loaderStatus = loaderStatus));

      this._axiosInstance
        .get(EApiEndpoints.COMPANIES)
        .then((res) => res.data)
        .then((companies) => observer.next(companies))
        .catch((error) => observer.error(error))
        .finally(() => (this._loaderStatus = false));
    });
  }

  public getCompanyById(companyId: number): Observable<ICompany> {
    return new Observable((observer) => {
      this._axiosInstance
        .get(`${EApiEndpoints.COMPANIES}/${companyId}`)
        .then((res) => res.data)
        .then((company) => observer.next(company))
        .catch((error) => observer.error(error));
    });
  }
}
