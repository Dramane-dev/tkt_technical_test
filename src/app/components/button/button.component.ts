import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChild('input') input!: ElementRef;
  @Output() displayListEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private _router: Router) {}

  public displayList: boolean = false;
  public requiredIcon: string = 'assets/icons/required.png';

  public navigateTo(url: string): void {
    this._router.navigate([url]);
  }

  public showAndHideList(): void {
    this.displayList = !this.displayList;
    setTimeout(() => {
      this.input?.nativeElement.focus();
    }, 0);
    this.displayListEvent.emit(this.displayList);
  }
}
