import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerOnHorizontal as ObiBlowerOnHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-on-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-on-horizontal.js';

@Component({
  selector: 'obi-blower-on-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerOnHorizontal {
  private _el: ObiBlowerOnHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerOnHorizontalElement>,
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

