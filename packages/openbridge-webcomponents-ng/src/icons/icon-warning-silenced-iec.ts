import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningSilencedIec as ObiWarningSilencedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-silenced-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-silenced-iec.js';

@Component({
  selector: 'obi-warning-silenced-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWarningSilencedIec {
  private _el: ObiWarningSilencedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningSilencedIecElement>,
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

