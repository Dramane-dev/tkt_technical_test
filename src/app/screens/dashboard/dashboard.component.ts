import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { EButtonType } from 'src/app/enum/EButtonTypes';
import { IButton } from 'src/app/interfaces/IButton';
import { ICompany } from 'src/app/interfaces/ICompany';
import { CompanyServices } from 'src/app/services/company.service';
import { LoaderServices } from 'src/app/services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public handsetScreen: boolean = false;
  public welcomeTitle: string = 'Welcome on TKT dashboard!';
  public littleButton: IButton = {
    text: '',
    type: EButtonType.LITTLE,
    icon: {
      name: 'bell',
      path: 'assets/icons/menu-scale.png',
    },
  };
  public buttons: IButton[] = [
    {
      text: 'Selector',
      type: EButtonType.SELECT,
      icon: {
        name: 'union',
        path: 'assets/icons/nav-arrow-down.png',
      },
    },
    {
      text: 'Company',
      type: EButtonType.SELECT,
      icon: {
        name: 'bell',
        path: 'assets/icons/nav-arrow-down.png',
      },
    },
  ];
  public displayList: boolean = false;
  public headers: string[] = ['COMPANY', 'N°SIREN', 'CATEGORY'];
  public companies: ICompany[] = [];
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _responsive: BreakpointObserver,
    private _companyServices: CompanyServices,
    private _loaderServices: LoaderServices,
    private _router: Router
  ) {}

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
      this._companyServices.getCompanies().subscribe((companies) => {
        this.companies = companies;
        this._loaderServices.setLoaderStatus(!this.isLoading$.value);
      })
    );
  }

  public navigateTo(url?: string, companyId?: number): void {
    companyId
      ? this._router.navigate([url, companyId])
      : this._router.navigate([url]);
  }

  public setDisplayList(show: boolean): void {
    this.displayList = show;
  }

  ngOnDestroy(): void {
    this._subscriptions.add(this._loaderServices.setLoaderStatus(true));
    this._subscriptions.unsubscribe();
  }
}
