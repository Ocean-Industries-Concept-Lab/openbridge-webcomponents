import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources01Off as ObiSources01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01-off.js';

@Component({
  selector: 'obi-sources-01-off',
  template: '<ng-content></ng-content>',
})
export class ObiSources01Off {
  private _el: ObiSources01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources01OffElement>,
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

