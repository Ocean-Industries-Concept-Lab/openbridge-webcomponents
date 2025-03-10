import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorComingFrom as ObiConnectorComingFromElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-coming-from.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-coming-from.js';

@Component({
  selector: 'obi-connector-coming-from',
  template: '<ng-content></ng-content>',
})
export class ObiConnectorComingFrom {
  private _el: ObiConnectorComingFromElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorComingFromElement>,
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

