import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetDangerousNocoghdgIec as ObiAisTargetDangerousNocoghdgIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-dangerous-nocoghdg-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-dangerous-nocoghdg-iec.js';

@Component({
  selector: 'obi-ais-target-dangerous-nocoghdg-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisTargetDangerousNocoghdgIec {
  private _el: ObiAisTargetDangerousNocoghdgIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetDangerousNocoghdgIecElement>,
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

