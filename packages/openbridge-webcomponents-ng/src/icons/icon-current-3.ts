import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCurrent3 as ObiCurrent3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-3.js';

@Component({
  selector: 'obi-current-3',
  template: '<ng-content></ng-content>',
})
export class ObiCurrent3 {
  private _el: ObiCurrent3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCurrent3Element>,
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

