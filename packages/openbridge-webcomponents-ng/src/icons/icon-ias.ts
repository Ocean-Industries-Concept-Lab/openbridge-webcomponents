import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIas as ObiIasElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ias.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ias.js';

@Component({
  selector: 'obi-ias',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiIas {
  private _el: ObiIasElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIasElement>,
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

