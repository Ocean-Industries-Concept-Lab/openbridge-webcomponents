import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWrench as ObiWrenchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wrench.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wrench.js';

@Component({
  selector: 'obi-wrench',
  template: '<ng-content></ng-content>',
})
export class ObiWrench {
  private _el: ObiWrenchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWrenchElement>,
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

