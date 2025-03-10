import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOnOffIec as ObiOnOffIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on-off-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on-off-iec.js';

@Component({
  selector: 'obi-on-off-iec',
  template: '<ng-content></ng-content>',
})
export class ObiOnOffIec {
  private _el: ObiOnOffIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOnOffIecElement>,
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

