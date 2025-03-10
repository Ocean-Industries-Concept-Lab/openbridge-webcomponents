import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorStaticVertical as ObiMotorStaticVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-static-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-static-vertical.js';

@Component({
  selector: 'obi-motor-static-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiMotorStaticVertical {
  private _el: ObiMotorStaticVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorStaticVerticalElement>,
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

