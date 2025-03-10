import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcClock as ObcClockElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/clock/clock.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/clock/clock.js';

@Component({
  selector: 'obc-clock',
  template: '<ng-content></ng-content>',
})
export class ObcClock {
  private _el: ObcClockElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcClockElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set date(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.date = v));
  }

  get date() {
    return this._el.date;
  }
  
  @Input()
  set showDate(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showDate = v));
  }

  get showDate() {
    return this._el.showDate;
  }
  
  @Input()
  set blinkOnlyBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.blinkOnlyBreakpointPx = v));
  }

  get blinkOnlyBreakpointPx() {
    return this._el.blinkOnlyBreakpointPx;
  }
  

  
}

