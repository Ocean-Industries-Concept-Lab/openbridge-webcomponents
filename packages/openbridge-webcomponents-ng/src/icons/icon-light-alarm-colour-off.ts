import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAlarmColourOff as ObiLightAlarmColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm-colour-off.js';

@Component({
  selector: 'obi-light-alarm-colour-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightAlarmColourOff {
  private _el: ObiLightAlarmColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAlarmColourOffElement>,
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

