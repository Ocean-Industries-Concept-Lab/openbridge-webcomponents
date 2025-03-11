import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralTShape as ObiBeaconGeneralTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-t-shape.js';

@Component({
  selector: 'obi-beacon-general-t-shape',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconGeneralTShape {
  private _el: ObiBeaconGeneralTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralTShapeElement>,
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

