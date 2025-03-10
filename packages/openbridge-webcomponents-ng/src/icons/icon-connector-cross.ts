import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorCross as ObiConnectorCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-cross.js';

@Component({
  selector: 'obi-connector-cross',
  template: '<ng-content></ng-content>',
})
export class ObiConnectorCross {
  private _el: ObiConnectorCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorCrossElement>,
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

