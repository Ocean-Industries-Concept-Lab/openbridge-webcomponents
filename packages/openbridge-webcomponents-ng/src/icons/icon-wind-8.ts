import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind8 as ObiWind8Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-8.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-8.js';

@Component({
  selector: 'obi-wind-8',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind8 {
  private _el: ObiWind8Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind8Element>,
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

