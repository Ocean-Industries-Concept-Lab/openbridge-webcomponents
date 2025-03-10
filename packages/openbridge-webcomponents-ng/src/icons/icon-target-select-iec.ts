import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetSelectIec as ObiTargetSelectIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-select-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-select-iec.js';

@Component({
  selector: 'obi-target-select-iec',
  template: '<ng-content></ng-content>',
})
export class ObiTargetSelectIec {
  private _el: ObiTargetSelectIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetSelectIecElement>,
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

