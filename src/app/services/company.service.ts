import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { EApiEndpoints } from '../enum/EApiEndpoints';
import { ICompany } from '../interfaces/ICompany';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyServices {
  private _axiosInstance: AxiosInstance;

  constructor(private _axiosService: AxiosService) {
    this._axiosInstance = this._axiosService.getInstance();
  }

  public getCompanies(): Observable<ICompany[]> {
    return new Observable((observer) => {
      this._axiosInstance
        .get(EApiEndpoints.COMPANIES)
        .then((res) => res.data)
        .then((companies: ICompany[]) => observer.next(companies))
        .catch((error) => observer.error(error));
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
