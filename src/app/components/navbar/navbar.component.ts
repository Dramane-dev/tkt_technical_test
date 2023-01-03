import { Component } from '@angular/core';
import { EButtonType } from 'src/app/enum/EButtonTypes';
import { IButton } from 'src/app/interfaces/IButton';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public buttons: IButton[] = [
    {
      text: 'DASHBOARD',
      type: EButtonType.LARGE,
      icon: {
        name: 'union',
        path: '../../../assets/icons/union.png',
      },
    },
    {
      text: 'LOREM IPSUM',
      type: EButtonType.LARGE,
      icon: {
        name: 'bell',
        path: '../../../assets/icons/bell.png',
      },
    },
    {
      text: 'LOREM IPSUM',
      type: EButtonType.LARGE,
      icon: {
        name: 'chat-bubble',
        path: '../../../assets/icons/chat-bubble.png',
      },
    },
  ];

  public currentUserInformations: IUser = {
    picture: '../../../assets/images/user-picture.png',
    fullname: 'Sophie L.',
    email: 'sophie.l@gmail.com',
  };
}
