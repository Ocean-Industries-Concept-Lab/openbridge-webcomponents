import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorOffVertical as ObiMotorOffVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-off-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-off-vertical.js';

@Component({
  selector: 'obi-motor-off-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiMotorOffVertical {
  private _el: ObiMotorOffVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorOffVerticalElement>,
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

