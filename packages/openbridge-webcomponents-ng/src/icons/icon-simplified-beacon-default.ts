import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconDefault as ObiSimplifiedBeaconDefaultElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-default.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-default.js';

@Component({
  selector: 'obi-simplified-beacon-default',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconDefault {
  private _el: ObiSimplifiedBeaconDefaultElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconDefaultElement>,
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

