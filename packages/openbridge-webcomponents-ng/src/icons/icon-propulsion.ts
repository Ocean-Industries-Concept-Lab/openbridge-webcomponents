import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsion as ObiPropulsionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion.js';

@Component({
  selector: 'obi-propulsion',
  template: '<ng-content></ng-content>',
})
export class ObiPropulsion {
  private _el: ObiPropulsionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionElement>,
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

