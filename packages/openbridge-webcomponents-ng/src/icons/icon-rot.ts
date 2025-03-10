import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRot as ObiRotElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rot.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rot.js';

@Component({
  selector: 'obi-rot',
  template: '<ng-content></ng-content>',
})
export class ObiRot {
  private _el: ObiRotElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRotElement>,
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

