import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCheckMixed as ObiCheckMixedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-check-mixed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-check-mixed.js';

@Component({
  selector: 'obi-check-mixed',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCheckMixed {
  private _el: ObiCheckMixedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCheckMixedElement>,
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

