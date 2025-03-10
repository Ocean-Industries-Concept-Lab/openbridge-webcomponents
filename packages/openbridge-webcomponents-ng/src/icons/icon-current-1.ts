import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCurrent1 as ObiCurrent1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-1.js';

@Component({
  selector: 'obi-current-1',
  template: '<ng-content></ng-content>',
})
export class ObiCurrent1 {
  private _el: ObiCurrent1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCurrent1Element>,
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

