import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter1Off as ObiFilter1OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-1-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-1-off.js';

@Component({
  selector: 'obi-filter-1-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFilter1Off {
  private _el: ObiFilter1OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter1OffElement>,
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

