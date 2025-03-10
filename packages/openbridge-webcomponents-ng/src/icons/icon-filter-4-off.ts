import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter4Off as ObiFilter4OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-4-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-4-off.js';

@Component({
  selector: 'obi-filter-4-off',
  template: '<ng-content></ng-content>',
})
export class ObiFilter4Off {
  private _el: ObiFilter4OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter4OffElement>,
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

