import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningTransferredIec as ObiWarningTransferredIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-transferred-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-transferred-iec.js';

@Component({
  selector: 'obi-warning-transferred-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWarningTransferredIec {
  private _el: ObiWarningTransferredIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningTransferredIecElement>,
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

