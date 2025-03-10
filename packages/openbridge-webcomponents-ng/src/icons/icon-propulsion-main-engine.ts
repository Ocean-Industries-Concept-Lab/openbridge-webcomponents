import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsionMainEngine as ObiPropulsionMainEngineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-main-engine.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-main-engine.js';

@Component({
  selector: 'obi-propulsion-main-engine',
  template: '<ng-content></ng-content>',
})
export class ObiPropulsionMainEngine {
  private _el: ObiPropulsionMainEngineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionMainEngineElement>,
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

