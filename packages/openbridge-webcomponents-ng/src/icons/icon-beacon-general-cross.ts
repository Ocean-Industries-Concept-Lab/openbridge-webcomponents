import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralCross as ObiBeaconGeneralCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-cross.js';

@Component({
  selector: 'obi-beacon-general-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconGeneralCross {
  private _el: ObiBeaconGeneralCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralCrossElement>,
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

