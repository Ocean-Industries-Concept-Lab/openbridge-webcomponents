import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouter2 as ObiRouter2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-2.js';

@Component({
  selector: 'obi-router-2',
  template: '<ng-content></ng-content>',
})
export class ObiRouter2 {
  private _el: ObiRouter2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouter2Element>,
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

