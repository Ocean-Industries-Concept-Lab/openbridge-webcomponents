import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpStaticHorizontal as ObiPumpStaticHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-static-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-static-horizontal.js';

@Component({
  selector: 'obi-pump-static-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiPumpStaticHorizontal {
  private _el: ObiPumpStaticHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpStaticHorizontalElement>,
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

