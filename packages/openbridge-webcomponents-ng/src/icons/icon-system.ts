import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSystem as ObiSystemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-system.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-system.js';

@Component({
  selector: 'obi-system',
  template: '<ng-content></ng-content>',
})
export class ObiSystem {
  private _el: ObiSystemElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSystemElement>,
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

