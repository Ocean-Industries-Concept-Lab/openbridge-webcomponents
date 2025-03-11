import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerXShape as ObiBeaconTowerXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-x-shape.js';

@Component({
  selector: 'obi-beacon-tower-x-shape',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconTowerXShape {
  private _el: ObiBeaconTowerXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerXShapeElement>,
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

