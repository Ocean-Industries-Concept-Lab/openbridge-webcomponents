import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSleeth as ObiSleethElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleeth.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleeth.js';

@Component({
  selector: 'obi-sleeth',
  template: '<ng-content></ng-content>',
})
export class ObiSleeth {
  private _el: ObiSleethElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSleethElement>,
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

