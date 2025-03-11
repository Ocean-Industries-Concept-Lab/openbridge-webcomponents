import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouter2Off as ObiRouter2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-2-off.js';

@Component({
  selector: 'obi-router-2-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouter2Off {
  private _el: ObiRouter2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouter2OffElement>,
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

