import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind6 as ObiWind6Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-6.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-6.js';

@Component({
  selector: 'obi-wind-6',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind6 {
  private _el: ObiWind6Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind6Element>,
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

