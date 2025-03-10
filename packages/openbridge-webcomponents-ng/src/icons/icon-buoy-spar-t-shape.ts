import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparTShape as ObiBuoySparTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-t-shape.js';

@Component({
  selector: 'obi-buoy-spar-t-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparTShape {
  private _el: ObiBuoySparTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparTShapeElement>,
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

