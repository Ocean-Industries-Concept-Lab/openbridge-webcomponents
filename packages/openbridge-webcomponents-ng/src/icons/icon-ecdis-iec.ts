import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEcdisIec as ObiEcdisIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ecdis-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ecdis-iec.js';

@Component({
  selector: 'obi-ecdis-iec',
  template: '<ng-content></ng-content>',
})
export class ObiEcdisIec {
  private _el: ObiEcdisIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEcdisIecElement>,
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

