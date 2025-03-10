import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComPa as ObiComPaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-pa.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-pa.js';

@Component({
  selector: 'obi-com-pa',
  template: '<ng-content></ng-content>',
})
export class ObiComPa {
  private _el: ObiComPaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComPaElement>,
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

