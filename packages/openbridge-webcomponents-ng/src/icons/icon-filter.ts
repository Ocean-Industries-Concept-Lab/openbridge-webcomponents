import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter as ObiFilterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter.js';

@Component({
  selector: 'obi-filter',
  template: '<ng-content></ng-content>',
})
export class ObiFilter {
  private _el: ObiFilterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilterElement>,
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

