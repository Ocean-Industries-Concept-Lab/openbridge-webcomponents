import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandNo as ObiCommandNoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-no.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-no.js';

@Component({
  selector: 'obi-command-no',
  template: '<ng-content></ng-content>',
})
export class ObiCommandNo {
  private _el: ObiCommandNoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandNoElement>,
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

