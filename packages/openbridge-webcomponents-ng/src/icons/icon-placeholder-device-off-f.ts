import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlaceholderDeviceOffF as ObiPlaceholderDeviceOffFElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-off-f.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-off-f.js';

@Component({
  selector: 'obi-placeholder-device-off-f',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPlaceholderDeviceOffF {
  private _el: ObiPlaceholderDeviceOffFElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlaceholderDeviceOffFElement>,
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

