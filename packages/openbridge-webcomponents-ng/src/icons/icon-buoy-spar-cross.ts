import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparCross as ObiBuoySparCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cross.js';

@Component({
  selector: 'obi-buoy-spar-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySparCross {
  private _el: ObiBuoySparCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparCrossElement>,
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

