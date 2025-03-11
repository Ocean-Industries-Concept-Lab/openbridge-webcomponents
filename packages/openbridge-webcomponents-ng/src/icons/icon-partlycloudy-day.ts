import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPartlycloudyDay as ObiPartlycloudyDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-day.js';

@Component({
  selector: 'obi-partlycloudy-day',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPartlycloudyDay {
  private _el: ObiPartlycloudyDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPartlycloudyDayElement>,
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

