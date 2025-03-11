import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorGoingTo as ObiConnectorGoingToElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-going-to.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-going-to.js';

@Component({
  selector: 'obi-connector-going-to',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnectorGoingTo {
  private _el: ObiConnectorGoingToElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorGoingToElement>,
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

