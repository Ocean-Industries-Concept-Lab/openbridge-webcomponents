import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorStraight as ObiConnectorStraightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-straight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-straight.js';

@Component({
  selector: 'obi-connector-straight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnectorStraight {
  private _el: ObiConnectorStraightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorStraightElement>,
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

