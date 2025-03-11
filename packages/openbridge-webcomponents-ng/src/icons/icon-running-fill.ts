import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRunningFill as ObiRunningFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running-fill.js';

@Component({
  selector: 'obi-running-fill',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRunningFill {
  private _el: ObiRunningFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRunningFillElement>,
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

