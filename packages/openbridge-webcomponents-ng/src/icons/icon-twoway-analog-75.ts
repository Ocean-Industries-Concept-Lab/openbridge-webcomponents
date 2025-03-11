import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAnalog75 as ObiTwowayAnalog75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-75.js';

@Component({
  selector: 'obi-twoway-analog-75',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayAnalog75 {
  private _el: ObiTwowayAnalog75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAnalog75Element>,
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

