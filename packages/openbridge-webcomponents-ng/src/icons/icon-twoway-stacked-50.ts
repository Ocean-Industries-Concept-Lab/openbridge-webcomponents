import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayStacked50 as ObiTwowayStacked50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-50.js';

@Component({
  selector: 'obi-twoway-stacked-50',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayStacked50 {
  private _el: ObiTwowayStacked50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayStacked50Element>,
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

