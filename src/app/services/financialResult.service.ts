import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { filter, from, Observable } from 'rxjs';
import { EApiEndpoints } from '../enum/EApiEndpoints';
import { IFinancialResult } from '../interfaces/IFinancialResult';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialResultServices {
  private _axiosInstance: AxiosInstance;

  constructor(private _axiosService: AxiosService) {
    this._axiosInstance = this._axiosService.getInstance();
  }

  public getFinancialResultsByIds(
    businessId: number
  ): Observable<IFinancialResult[]> {
    let financialResults: IFinancialResult[] = [];

    return new Observable((observer) => {
      this._axiosInstance
        .get(EApiEndpoints.FINANCIAL_RESULTS)
        .then((res) => res.data)
        .then((datas: IFinancialResult[]) => {
          from(datas)
            .pipe(filter((data) => data.business === businessId))
            .subscribe((data) => {
              financialResults = [...financialResults, data];
            });
        })
        .catch((error) => observer.error(error))
        .finally(() => {
          observer.next(financialResults);
        });
    });
  }
}
