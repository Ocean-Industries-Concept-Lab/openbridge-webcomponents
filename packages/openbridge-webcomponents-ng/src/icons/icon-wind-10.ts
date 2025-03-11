import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind10 as ObiWind10Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-10.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-10.js';

@Component({
  selector: 'obi-wind-10',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind10 {
  private _el: ObiWind10Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind10Element>,
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

