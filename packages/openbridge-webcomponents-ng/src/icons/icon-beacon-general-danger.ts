import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralDanger as ObiBeaconGeneralDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-danger.js';

@Component({
  selector: 'obi-beacon-general-danger',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralDanger {
  private _el: ObiBeaconGeneralDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralDangerElement>,
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

