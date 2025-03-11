import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTempCold as ObiTempColdElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-cold.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-cold.js';

@Component({
  selector: 'obi-temp-cold',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTempCold {
  private _el: ObiTempColdElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTempColdElement>,
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

