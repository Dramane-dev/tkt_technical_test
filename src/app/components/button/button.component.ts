import { Component, Input } from '@angular/core';
import { EButtonType } from 'src/app/enum/EButtonTypes';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonType: EButtonType = EButtonType.LARGE;
  @Input() buttonText: string = '';
  @Input() iconName: string | undefined = '';
  @Input() icon: string | undefined = '';

  public navigateTo(btnType: string): void {
    console.log('navigate to dashboard! ', typeof btnType);
  }
}
