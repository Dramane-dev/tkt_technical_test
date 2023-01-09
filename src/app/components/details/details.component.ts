import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { IFinancialResult } from 'src/app/interfaces/IFinancialResult';
import { ICharts } from 'src/app/interfaces/ICharts';
import { IMinimalCompany } from 'src/app/interfaces/IMinimalCompany';
import { CompanyServices } from 'src/app/services/company.service';
import { LoaderServices } from 'src/app/services/loader.service';
import { FinancialResultServices } from 'src/app/services/financialResult.service';
import { IICon } from 'src/app/interfaces/IIcon';
import { IButton } from 'src/app/interfaces/IButton';
import { EButtonType } from 'src/app/enum/EButtonTypes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public handsetScreen: boolean = false;
  public goBackIcon: IICon = {
    name: 'go back',
    path: 'assets/icons/back-row.png',
  };
  public littleButton: IButton = {
    text: '',
    type: EButtonType.LITTLE,
    icon: {
      name: 'bell',
      path: 'assets/icons/back-row.png',
    },
  };
  public button: IButton = {
    text: '',
    type: EButtonType.LITTLE,
    icon: this.goBackIcon,
  };
  public company!: IMinimalCompany;
  public companyId: number;
  public financialResults!: IFinancialResult[];
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _loaderServices: LoaderServices,
    private _companyServices: CompanyServices,
    private _financialResultServices: FinancialResultServices,
    private _route: ActivatedRoute,
    private _router: Router,
    private _responsive: BreakpointObserver
  ) {
    this.companyId = Number(this._route.snapshot.paramMap.get('companyId'));
    this.company = {
      id: 0,
      name: '',
      siren: 0,
    };
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this._responsive
        .observe(Breakpoints.HandsetPortrait)
        .subscribe((result) => {
          this.handsetScreen = result.matches ?? false;
        })
    );
    this._subscriptions.add(
      this._loaderServices
        .getLoaderStatus()
        .subscribe((loaderStatus) => this.isLoading$.next(loaderStatus))
    );
    this._subscriptions.add(
      this._companyServices
        .getCompanyById(this.companyId)
        .pipe(
          map((company) => ({
            id: company.id,
            name: company.name,
            siren: company.siren,
          }))
        )
        .subscribe((company) => {
          this.company = company;

          this._subscriptions.add(
            of(this.company.id).subscribe((resultId) => {
              this._financialResultServices
                .getFinancialResultsByIds(resultId)
                .subscribe((financialResult) => {
                  this.financialResults = financialResult;
                  this._loaderServices.setLoaderStatus(!this.isLoading$.value);
                });
            })
          );
        })
    );
  }

  public navigateTo(url?: string, companyId?: number): void {
    companyId
      ? this._router.navigate([url, companyId])
      : this._router.navigate([url]);
  }

  ngOnDestroy(): void {
    this._subscriptions.add(this._loaderServices.setLoaderStatus(true));
    this._subscriptions.unsubscribe();
  }
}
