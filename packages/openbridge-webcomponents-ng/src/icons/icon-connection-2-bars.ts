import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnection2Bars as ObiConnection2BarsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-2-bars.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-2-bars.js';

@Component({
  selector: 'obi-connection-2-bars',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnection2Bars {
  private _el: ObiConnection2BarsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnection2BarsElement>,
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

