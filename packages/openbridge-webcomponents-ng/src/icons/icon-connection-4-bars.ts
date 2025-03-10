import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnection4Bars as ObiConnection4BarsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-4-bars.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-4-bars.js';

@Component({
  selector: 'obi-connection-4-bars',
  template: '<ng-content></ng-content>',
})
export class ObiConnection4Bars {
  private _el: ObiConnection4BarsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnection4BarsElement>,
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

