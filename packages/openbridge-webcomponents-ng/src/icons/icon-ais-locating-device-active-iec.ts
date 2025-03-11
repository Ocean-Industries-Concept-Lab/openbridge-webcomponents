import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisLocatingDeviceActiveIec as ObiAisLocatingDeviceActiveIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locating-device-active-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locating-device-active-iec.js';

@Component({
  selector: 'obi-ais-locating-device-active-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisLocatingDeviceActiveIec {
  private _el: ObiAisLocatingDeviceActiveIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisLocatingDeviceActiveIecElement>,
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

