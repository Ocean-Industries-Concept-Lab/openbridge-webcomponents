import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnection3Bars as ObiConnection3BarsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-3-bars.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-3-bars.js';

@Component({
  selector: 'obi-connection-3-bars',
  template: '<ng-content></ng-content>',
})
export class ObiConnection3Bars {
  private _el: ObiConnection3BarsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnection3BarsElement>,
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

