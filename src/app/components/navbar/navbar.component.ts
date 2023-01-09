import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';

import { EButtonType } from 'src/app/enum/EButtonTypes';
import { IButton } from 'src/app/interfaces/IButton';
import { IUser } from 'src/app/interfaces/IUser';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public handsetScreen: boolean = false;
  public littleButton: IButton = {
    text: '',
    type: EButtonType.LITTLE,
    icon: {
      name: 'bell',
      path: 'assets/icons/close.png',
    },
  };
  public buttons: IButton[] = [
    {
      text: 'DASHBOARD',
      type: EButtonType.LARGE,
      icon: {
        name: 'union',
        path: 'assets/icons/union.png',
      },
    },
    {
      text: 'LOREM IPSUM',
      type: EButtonType.LARGE,
      icon: {
        name: 'bell',
        path: 'assets/icons/bell.png',
      },
    },
    {
      text: 'LOREM IPSUM',
      type: EButtonType.LARGE,
      icon: {
        name: 'chat-bubble',
        path: 'assets/icons/chat-bubble.png',
      },
    },
  ];
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _responsive: BreakpointObserver,
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
  }

  public currentUserInformations: IUser = {
    picture: 'assets/images/user-picture.png',
    fullname: 'Sophie L.',
    email: 'sophie.l@gmail.com',
  };

  public navigateTo(url?: string, companyId?: number): void {
    companyId
      ? this._router.navigate([url, companyId])
      : this._router.navigate([url]);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
