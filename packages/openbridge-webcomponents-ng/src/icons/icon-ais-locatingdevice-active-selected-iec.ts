import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisLocatingdeviceActiveSelectedIec as ObiAisLocatingdeviceActiveSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-active-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-locatingdevice-active-selected-iec.js';

@Component({
  selector: 'obi-ais-locatingdevice-active-selected-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisLocatingdeviceActiveSelectedIec {
  private _el: ObiAisLocatingdeviceActiveSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisLocatingdeviceActiveSelectedIecElement>,
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

