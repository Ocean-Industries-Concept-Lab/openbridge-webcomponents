import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOff as ObiOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-off.js';

@Component({
  selector: 'obi-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOff {
  private _el: ObiOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOffElement>,
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

