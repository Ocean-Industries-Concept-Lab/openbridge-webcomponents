import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUnknownobject as ObiUnknownobjectElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unknownobject.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unknownobject.js';

@Component({
  selector: 'obi-unknownobject',
  template: '<ng-content></ng-content>',
})
export class ObiUnknownobject {
  private _el: ObiUnknownobjectElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUnknownobjectElement>,
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

