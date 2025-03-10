import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOffIec as ObiOffIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-off-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-off-iec.js';

@Component({
  selector: 'obi-off-iec',
  template: '<ng-content></ng-content>',
})
export class ObiOffIec {
  private _el: ObiOffIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOffIecElement>,
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

