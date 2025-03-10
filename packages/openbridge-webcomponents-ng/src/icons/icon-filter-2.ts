import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter2 as ObiFilter2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2.js';

@Component({
  selector: 'obi-filter-2',
  template: '<ng-content></ng-content>',
})
export class ObiFilter2 {
  private _el: ObiFilter2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter2Element>,
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

