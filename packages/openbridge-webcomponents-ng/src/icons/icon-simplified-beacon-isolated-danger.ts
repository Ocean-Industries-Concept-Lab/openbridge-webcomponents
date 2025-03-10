import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconIsolatedDanger as ObiSimplifiedBeaconIsolatedDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-isolated-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-isolated-danger.js';

@Component({
  selector: 'obi-simplified-beacon-isolated-danger',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconIsolatedDanger {
  private _el: ObiSimplifiedBeaconIsolatedDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconIsolatedDangerElement>,
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

