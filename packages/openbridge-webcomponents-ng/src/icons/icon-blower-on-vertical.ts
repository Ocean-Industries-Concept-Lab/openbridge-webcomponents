import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerOnVertical as ObiBlowerOnVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-on-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-on-vertical.js';

@Component({
  selector: 'obi-blower-on-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerOnVertical {
  private _el: ObiBlowerOnVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerOnVerticalElement>,
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

