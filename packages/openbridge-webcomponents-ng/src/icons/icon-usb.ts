import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUsb as ObiUsbElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-usb.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-usb.js';

@Component({
  selector: 'obi-usb',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiUsb {
  private _el: ObiUsbElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUsbElement>,
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

