import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlaceholderDeviceOn as ObiPlaceholderDeviceOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder-device-on.js';

@Component({
  selector: 'obi-placeholder-device-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPlaceholderDeviceOn {
  private _el: ObiPlaceholderDeviceOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlaceholderDeviceOnElement>,
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

