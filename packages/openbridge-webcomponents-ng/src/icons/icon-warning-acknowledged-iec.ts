import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningAcknowledgedIec as ObiWarningAcknowledgedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-acknowledged-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-acknowledged-iec.js';

@Component({
  selector: 'obi-warning-acknowledged-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWarningAcknowledgedIec {
  private _el: ObiWarningAcknowledgedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningAcknowledgedIecElement>,
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

