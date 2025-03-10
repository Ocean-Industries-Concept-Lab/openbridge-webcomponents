import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetCancelIec as ObiTargetCancelIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-cancel-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-cancel-iec.js';

@Component({
  selector: 'obi-target-cancel-iec',
  template: '<ng-content></ng-content>',
})
export class ObiTargetCancelIec {
  private _el: ObiTargetCancelIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetCancelIecElement>,
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

