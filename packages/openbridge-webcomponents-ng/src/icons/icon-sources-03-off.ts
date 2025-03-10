import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources03Off as ObiSources03OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03-off.js';

@Component({
  selector: 'obi-sources-03-off',
  template: '<ng-content></ng-content>',
})
export class ObiSources03Off {
  private _el: ObiSources03OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources03OffElement>,
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

