import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmBadge as ObiAlarmBadgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-badge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-badge.js';

@Component({
  selector: 'obi-alarm-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmBadge {
  private _el: ObiAlarmBadgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmBadgeElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

