import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerStaticVertical as ObiBlowerStaticVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-static-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-static-vertical.js';

@Component({
  selector: 'obi-blower-static-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerStaticVertical {
  private _el: ObiBlowerStaticVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerStaticVerticalElement>,
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

