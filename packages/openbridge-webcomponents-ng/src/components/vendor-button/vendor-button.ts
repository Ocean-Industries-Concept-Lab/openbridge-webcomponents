import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcVendorButton as ObcVendorButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/vendor-button/vendor-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/vendor-button/vendor-button.js';

@Component({
  selector: 'obc-vendor-button',
  template: '<ng-content></ng-content>',
})
export class ObcVendorButton {
  private _el: ObcVendorButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcVendorButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set imageSrc(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.imageSrc = v));
  }

  get imageSrc() {
    return this._el.imageSrc;
  }
  
  @Input()
  set alt(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.alt = v));
  }

  get alt() {
    return this._el.alt;
  }
  

  
}

