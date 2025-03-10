import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCamHmiIec as ObiCamHmiIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cam-hmi-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cam-hmi-iec.js';

@Component({
  selector: 'obi-cam-hmi-iec',
  template: '<ng-content></ng-content>',
})
export class ObiCamHmiIec {
  private _el: ObiCamHmiIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCamHmiIecElement>,
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

