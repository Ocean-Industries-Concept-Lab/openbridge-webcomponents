import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDeviceFilter as ObiDeviceFilterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-device-filter.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-device-filter.js';

@Component({
  selector: 'obi-device-filter',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDeviceFilter {
  private _el: ObiDeviceFilterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDeviceFilterElement>,
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

