import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningUnacknowledgedIec as ObiWarningUnacknowledgedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-unacknowledged-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-unacknowledged-iec.js';

@Component({
  selector: 'obi-warning-unacknowledged-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWarningUnacknowledgedIec {
  private _el: ObiWarningUnacknowledgedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningUnacknowledgedIecElement>,
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

