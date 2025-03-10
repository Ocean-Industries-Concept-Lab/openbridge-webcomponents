import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter1 as ObiFilter1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-1.js';

@Component({
  selector: 'obi-filter-1',
  template: '<ng-content></ng-content>',
})
export class ObiFilter1 {
  private _el: ObiFilter1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter1Element>,
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

