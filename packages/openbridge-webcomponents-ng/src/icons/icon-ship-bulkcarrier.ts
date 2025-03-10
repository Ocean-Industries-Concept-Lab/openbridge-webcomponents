import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipBulkcarrier as ObiShipBulkcarrierElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-bulkcarrier.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-bulkcarrier.js';

@Component({
  selector: 'obi-ship-bulkcarrier',
  template: '<ng-content></ng-content>',
})
export class ObiShipBulkcarrier {
  private _el: ObiShipBulkcarrierElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipBulkcarrierElement>,
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

