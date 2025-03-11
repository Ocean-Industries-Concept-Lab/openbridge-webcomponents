import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetCancelAllIec as ObiTargetCancelAllIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-cancel-all-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-cancel-all-iec.js';

@Component({
  selector: 'obi-target-cancel-all-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetCancelAllIec {
  private _el: ObiTargetCancelAllIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetCancelAllIecElement>,
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

