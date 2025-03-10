import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerTShape as ObiBeaconTowerTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-t-shape.js';

@Component({
  selector: 'obi-beacon-tower-t-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconTowerTShape {
  private _el: ObiBeaconTowerTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerTShapeElement>,
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

