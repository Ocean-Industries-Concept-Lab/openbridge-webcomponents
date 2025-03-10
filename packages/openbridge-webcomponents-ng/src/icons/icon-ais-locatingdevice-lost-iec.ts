import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisLocatingdeviceLostIec as ObiAisLocatingdeviceLostIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-lost-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-lost-iec.js';

@Component({
  selector: 'obi-ais-locatingdevice-lost-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisLocatingdeviceLostIec {
  private _el: ObiAisLocatingdeviceLostIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisLocatingdeviceLostIecElement>,
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

