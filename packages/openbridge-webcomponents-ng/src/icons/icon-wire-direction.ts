import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireDirection as ObiWireDirectionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-direction.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-direction.js';

@Component({
  selector: 'obi-wire-direction',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWireDirection {
  private _el: ObiWireDirectionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireDirectionElement>,
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

