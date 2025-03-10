import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmNoackIec as ObiAlarmNoackIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-noack-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-noack-iec.js';

@Component({
  selector: 'obi-alarm-noack-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmNoackIec {
  private _el: ObiAlarmNoackIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmNoackIecElement>,
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

