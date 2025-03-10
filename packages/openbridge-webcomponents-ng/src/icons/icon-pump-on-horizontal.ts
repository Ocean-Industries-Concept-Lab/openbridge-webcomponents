import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpOnHorizontal as ObiPumpOnHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-on-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-on-horizontal.js';

@Component({
  selector: 'obi-pump-on-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiPumpOnHorizontal {
  private _el: ObiPumpOnHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpOnHorizontalElement>,
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

