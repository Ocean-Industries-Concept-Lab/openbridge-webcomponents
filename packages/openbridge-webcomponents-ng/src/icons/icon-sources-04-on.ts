import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources04On as ObiSources04OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04-on.js';

@Component({
  selector: 'obi-sources-04-on',
  template: '<ng-content></ng-content>',
})
export class ObiSources04On {
  private _el: ObiSources04OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources04OnElement>,
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

