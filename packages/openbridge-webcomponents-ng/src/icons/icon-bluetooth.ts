import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBluetooth as ObiBluetoothElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bluetooth.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bluetooth.js';

@Component({
  selector: 'obi-bluetooth',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBluetooth {
  private _el: ObiBluetoothElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBluetoothElement>,
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

