import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelSquare as ObiBuoyBarrelSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-square.js';

@Component({
  selector: 'obi-buoy-barrel-square',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyBarrelSquare {
  private _el: ObiBuoyBarrelSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelSquareElement>,
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

