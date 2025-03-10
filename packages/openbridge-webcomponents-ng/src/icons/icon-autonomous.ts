import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAutonomous as ObiAutonomousElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-autonomous.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-autonomous.js';

@Component({
  selector: 'obi-autonomous',
  template: '<ng-content></ng-content>',
})
export class ObiAutonomous {
  private _el: ObiAutonomousElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAutonomousElement>,
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

