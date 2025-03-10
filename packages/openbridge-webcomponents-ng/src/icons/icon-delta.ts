import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDelta as ObiDeltaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delta.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delta.js';

@Component({
  selector: 'obi-delta',
  template: '<ng-content></ng-content>',
})
export class ObiDelta {
  private _el: ObiDeltaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDeltaElement>,
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

