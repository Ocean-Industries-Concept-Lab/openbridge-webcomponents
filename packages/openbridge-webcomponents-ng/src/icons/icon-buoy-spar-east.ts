import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparEast as ObiBuoySparEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-east.js';

@Component({
  selector: 'obi-buoy-spar-east',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySparEast {
  private _el: ObiBuoySparEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparEastElement>,
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

