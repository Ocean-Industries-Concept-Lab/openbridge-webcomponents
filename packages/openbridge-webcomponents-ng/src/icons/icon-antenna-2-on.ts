import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntenna2On as ObiAntenna2OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2-on.js';

@Component({
  selector: 'obi-antenna-2-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAntenna2On {
  private _el: ObiAntenna2OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntenna2OnElement>,
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

