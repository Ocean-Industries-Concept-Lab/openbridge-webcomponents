import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmLightOff as ObiAlarmLightOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-light-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-light-off.js';

@Component({
  selector: 'obi-alarm-light-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmLightOff {
  private _el: ObiAlarmLightOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmLightOffElement>,
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

