import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyMooringBarrel as ObiBuoyMooringBarrelElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-mooring-barrel.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-mooring-barrel.js';

@Component({
  selector: 'obi-buoy-mooring-barrel',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyMooringBarrel {
  private _el: ObiBuoyMooringBarrelElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyMooringBarrelElement>,
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

