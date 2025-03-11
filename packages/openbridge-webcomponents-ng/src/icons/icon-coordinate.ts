import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCoordinate as ObiCoordinateElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coordinate.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coordinate.js';

@Component({
  selector: 'obi-coordinate',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCoordinate {
  private _el: ObiCoordinateElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCoordinateElement>,
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

