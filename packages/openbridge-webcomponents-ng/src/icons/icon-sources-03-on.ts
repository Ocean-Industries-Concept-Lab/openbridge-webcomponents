import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources03On as ObiSources03OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03-on.js';

@Component({
  selector: 'obi-sources-03-on',
  template: '<ng-content></ng-content>',
})
export class ObiSources03On {
  private _el: ObiSources03OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources03OnElement>,
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

