import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctComingFrom as ObiDuctComingFromElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-coming-from.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-coming-from.js';

@Component({
  selector: 'obi-duct-coming-from',
  template: '<ng-content></ng-content>',
})
export class ObiDuctComingFrom {
  private _el: ObiDuctComingFromElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctComingFromElement>,
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

