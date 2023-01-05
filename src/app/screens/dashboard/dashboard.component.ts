import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EButtonType } from 'src/app/enum/EButtonTypes';
import { IButton } from 'src/app/interfaces/IButton';
import { ICompany } from 'src/app/interfaces/ICompany';
import { CompanyServices } from 'src/app/services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public welcomeTitle: string = 'Welcome on TKT dashboard!';
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
  // public companies: ICompany[] = [
  //   {
  //     id: 1,
  //     name: 'Reinger Inc',
  //     sector: 'Services',
  //     siren: 135694027,
  //     results: [1, 2],
  //   },
  //   {
  //     id: 1,
  //     name: 'Reinger Inc',
  //     sector: 'Services',
  //     siren: 135694027,
  //     results: [1, 2],
  //   },
  //   {
  //     id: 1,
  //     name: 'Reinger Inc',
  //     sector: 'Services',
  //     siren: 135694027,
  //     results: [1, 2],
  //   },
  //   {
  //     id: 1,
  //     name: 'Reinger Inc',
  //     sector: 'Services',
  //     siren: 135694027,
  //     results: [1, 2],
  //   },
  //   {
  //     id: 1,
  //     name: 'Reinger Inc',
  //     sector: 'Services',
  //     siren: 135694027,
  //     results: [1, 2],
  //   },
  // ];
  public companies: ICompany[] = [];
  public isLoading$: Observable<boolean> = new Observable<false>();
  private _subscriptions: Subscription = new Subscription();

  constructor(private _companyServices: CompanyServices) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._companyServices
        .getCompanies()
        .subscribe((companies) => (this.companies = companies))
    );
  }

  public navigateTo(companyId: number): void {
    console.log('navigate to details/', companyId);
  }

  setDisplayList(show: boolean): void {
    this.displayList = show;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
