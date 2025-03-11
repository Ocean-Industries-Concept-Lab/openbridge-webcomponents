import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalFlag as ObiBuoyConicalFlagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-flag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-flag.js';

@Component({
  selector: 'obi-buoy-conical-flag',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyConicalFlag {
  private _el: ObiBuoyConicalFlagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalFlagElement>,
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

