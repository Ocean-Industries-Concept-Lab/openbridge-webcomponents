import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenQuad as ObiScreenQuadElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-quad.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-quad.js';

@Component({
  selector: 'obi-screen-quad',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiScreenQuad {
  private _el: ObiScreenQuadElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenQuadElement>,
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

