import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiYaw as ObiYawElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-yaw.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-yaw.js';

@Component({
  selector: 'obi-yaw',
  template: '<ng-content></ng-content>',
})
export class ObiYaw {
  private _el: ObiYawElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiYawElement>,
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

