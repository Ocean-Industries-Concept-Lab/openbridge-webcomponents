import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyDefault as ObiBuoyDefaultElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-default.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-default.js';

@Component({
  selector: 'obi-buoy-default',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyDefault {
  private _el: ObiBuoyDefaultElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyDefaultElement>,
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

