import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayStackedOpen as ObiTwowayStackedOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-open.js';

@Component({
  selector: 'obi-twoway-stacked-open',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayStackedOpen {
  private _el: ObiTwowayStackedOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayStackedOpenElement>,
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

