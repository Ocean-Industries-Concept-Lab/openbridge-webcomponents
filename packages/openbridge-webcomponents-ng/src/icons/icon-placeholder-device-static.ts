import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlaceholderDeviceStatic as ObiPlaceholderDeviceStaticElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-static.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-static.js';

@Component({
  selector: 'obi-placeholder-device-static',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPlaceholderDeviceStatic {
  private _el: ObiPlaceholderDeviceStaticElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlaceholderDeviceStaticElement>,
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

