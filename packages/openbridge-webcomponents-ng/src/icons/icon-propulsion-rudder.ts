import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsionRudder as ObiPropulsionRudderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-rudder.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-rudder.js';

@Component({
  selector: 'obi-propulsion-rudder',
  template: '<ng-content></ng-content>',
})
export class ObiPropulsionRudder {
  private _el: ObiPropulsionRudderElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionRudderElement>,
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

