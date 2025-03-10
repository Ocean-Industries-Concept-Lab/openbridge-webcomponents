import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources03 as ObiSources03Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-03.js';

@Component({
  selector: 'obi-sources-03',
  template: '<ng-content></ng-content>',
})
export class ObiSources03 {
  private _el: ObiSources03Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources03Element>,
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

