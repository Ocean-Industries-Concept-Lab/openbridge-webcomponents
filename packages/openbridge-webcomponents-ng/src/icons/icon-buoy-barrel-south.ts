import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelSouth as ObiBuoyBarrelSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-south.js';

@Component({
  selector: 'obi-buoy-barrel-south',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyBarrelSouth {
  private _el: ObiBuoyBarrelSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelSouthElement>,
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

