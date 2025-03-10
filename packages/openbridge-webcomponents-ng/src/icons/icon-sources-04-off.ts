import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources04Off as ObiSources04OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04-off.js';

@Component({
  selector: 'obi-sources-04-off',
  template: '<ng-content></ng-content>',
})
export class ObiSources04Off {
  private _el: ObiSources04OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources04OffElement>,
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

