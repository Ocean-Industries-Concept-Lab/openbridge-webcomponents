import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayStacked75 as ObiTwowayStacked75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-75.js';

@Component({
  selector: 'obi-twoway-stacked-75',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayStacked75 {
  private _el: ObiTwowayStacked75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayStacked75Element>,
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

