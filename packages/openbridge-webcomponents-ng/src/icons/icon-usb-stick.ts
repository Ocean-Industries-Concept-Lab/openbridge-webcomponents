import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUsbStick as ObiUsbStickElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-usb-stick.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-usb-stick.js';

@Component({
  selector: 'obi-usb-stick',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiUsbStick {
  private _el: ObiUsbStickElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUsbStickElement>,
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

