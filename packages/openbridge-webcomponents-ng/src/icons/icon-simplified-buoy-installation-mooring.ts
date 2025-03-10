import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyInstallationMooring as ObiSimplifiedBuoyInstallationMooringElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-installation-mooring.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-installation-mooring.js';

@Component({
  selector: 'obi-simplified-buoy-installation-mooring',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoyInstallationMooring {
  private _el: ObiSimplifiedBuoyInstallationMooringElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyInstallationMooringElement>,
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

