import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearDay as ObiClearDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-day.js';

@Component({
  selector: 'obi-clear-day',
  template: '<ng-content></ng-content>',
})
export class ObiClearDay {
  private _el: ObiClearDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearDayElement>,
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

