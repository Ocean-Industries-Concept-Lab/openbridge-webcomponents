import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedSimplifiedBuoyIsolatedDanger as ObiSimplifiedSimplifiedBuoyIsolatedDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-simplified-buoy-isolated-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-simplified-buoy-isolated-danger.js';

@Component({
  selector: 'obi-simplified-simplified-buoy-isolated-danger',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedSimplifiedBuoyIsolatedDanger {
  private _el: ObiSimplifiedSimplifiedBuoyIsolatedDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedSimplifiedBuoyIsolatedDangerElement>,
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

