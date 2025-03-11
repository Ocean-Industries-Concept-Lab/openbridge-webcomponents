import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarSouth as ObiBuoyPilarSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-south.js';

@Component({
  selector: 'obi-buoy-pilar-south',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyPilarSouth {
  private _el: ObiBuoyPilarSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarSouthElement>,
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

