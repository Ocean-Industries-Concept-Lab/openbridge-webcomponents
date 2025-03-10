import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayStacked25 as ObiTwowayStacked25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-25.js';

@Component({
  selector: 'obi-twoway-stacked-25',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayStacked25 {
  private _el: ObiTwowayStacked25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayStacked25Element>,
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

