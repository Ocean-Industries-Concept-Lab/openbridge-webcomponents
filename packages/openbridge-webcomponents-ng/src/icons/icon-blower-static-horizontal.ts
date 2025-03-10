import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerStaticHorizontal as ObiBlowerStaticHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-static-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-static-horizontal.js';

@Component({
  selector: 'obi-blower-static-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerStaticHorizontal {
  private _el: ObiBlowerStaticHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerStaticHorizontalElement>,
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

