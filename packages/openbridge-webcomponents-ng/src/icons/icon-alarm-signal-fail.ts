import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmSignalFail as ObiAlarmSignalFailElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-signal-fail.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-signal-fail.js';

@Component({
  selector: 'obi-alarm-signal-fail',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmSignalFail {
  private _el: ObiAlarmSignalFailElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmSignalFailElement>,
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

