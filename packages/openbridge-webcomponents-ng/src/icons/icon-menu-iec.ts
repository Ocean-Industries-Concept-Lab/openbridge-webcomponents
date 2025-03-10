import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMenuIec as ObiMenuIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-menu-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-menu-iec.js';

@Component({
  selector: 'obi-menu-iec',
  template: '<ng-content></ng-content>',
})
export class ObiMenuIec {
  private _el: ObiMenuIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMenuIecElement>,
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

