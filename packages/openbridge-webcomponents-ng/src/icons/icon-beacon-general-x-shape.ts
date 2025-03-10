import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralXShape as ObiBeaconGeneralXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-x-shape.js';

@Component({
  selector: 'obi-beacon-general-x-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralXShape {
  private _el: ObiBeaconGeneralXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralXShapeElement>,
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

