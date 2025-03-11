import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsionStatic as ObiPropulsionStaticElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-static.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-static.js';

@Component({
  selector: 'obi-propulsion-static',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPropulsionStatic {
  private _el: ObiPropulsionStaticElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionStaticElement>,
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

