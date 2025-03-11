import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifistrengt1Google as ObiWifistrengt1GoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-1-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-1-google.js';

@Component({
  selector: 'obi-wifistrengt-1-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWifistrengt1Google {
  private _el: ObiWifistrengt1GoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifistrengt1GoogleElement>,
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

