import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanFlag as ObiBuoyCanFlagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-flag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-flag.js';

@Component({
  selector: 'obi-buoy-can-flag',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyCanFlag {
  private _el: ObiBuoyCanFlagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanFlagElement>,
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

