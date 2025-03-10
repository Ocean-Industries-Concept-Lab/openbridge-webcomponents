import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLineOfPositionIec as ObiLineOfPositionIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-line-of-position-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-line-of-position-iec.js';

@Component({
  selector: 'obi-line-of-position-iec',
  template: '<ng-content></ng-content>',
})
export class ObiLineOfPositionIec {
  private _el: ObiLineOfPositionIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLineOfPositionIecElement>,
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

