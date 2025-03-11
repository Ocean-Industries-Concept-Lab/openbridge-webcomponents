import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearDayColour as ObiClearDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-day-colour.js';

@Component({
  selector: 'obi-clear-day-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiClearDayColour {
  private _el: ObiClearDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearDayColourElement>,
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

