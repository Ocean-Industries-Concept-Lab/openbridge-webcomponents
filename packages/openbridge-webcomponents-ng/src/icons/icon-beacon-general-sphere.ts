import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralSphere as ObiBeaconGeneralSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-sphere.js';

@Component({
  selector: 'obi-beacon-general-sphere',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconGeneralSphere {
  private _el: ObiBeaconGeneralSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralSphereElement>,
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

