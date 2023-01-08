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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public handsetScreen: boolean = false;
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

  constructor(private _responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._responsive
        .observe(Breakpoints.HandsetPortrait)
        .subscribe((result) => {
          console.log(result);
          if (result.matches) {
            this.handsetScreen = true;
          } else {
            this.handsetScreen = false;
          }
        })
    );
  }

  public currentUserInformations: IUser = {
    picture: 'assets/images/user-picture.png',
    fullname: 'Sophie L.',
    email: 'sophie.l@gmail.com',
  };

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
