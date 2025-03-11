import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisLocatingdeviceTestIec as ObiAisLocatingdeviceTestIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-test-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-test-iec.js';

@Component({
  selector: 'obi-ais-locatingdevice-test-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisLocatingdeviceTestIec {
  private _el: ObiAisLocatingdeviceTestIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisLocatingdeviceTestIecElement>,
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

