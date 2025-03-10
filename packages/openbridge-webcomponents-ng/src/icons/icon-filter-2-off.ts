import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter2Off as ObiFilter2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2-off.js';

@Component({
  selector: 'obi-filter-2-off',
  template: '<ng-content></ng-content>',
})
export class ObiFilter2Off {
  private _el: ObiFilter2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter2OffElement>,
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

