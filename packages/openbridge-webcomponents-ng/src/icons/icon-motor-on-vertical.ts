import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorOnVertical as ObiMotorOnVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-on-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-on-vertical.js';

@Component({
  selector: 'obi-motor-on-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiMotorOnVertical {
  private _el: ObiMotorOnVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorOnVerticalElement>,
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

