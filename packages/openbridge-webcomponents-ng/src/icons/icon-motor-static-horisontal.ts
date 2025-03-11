import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorStaticHorisontal as ObiMotorStaticHorisontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-static-horisontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-static-horisontal.js';

@Component({
  selector: 'obi-motor-static-horisontal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMotorStaticHorisontal {
  private _el: ObiMotorStaticHorisontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorStaticHorisontalElement>,
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

