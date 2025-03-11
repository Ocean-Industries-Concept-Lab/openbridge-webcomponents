import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAol as ObiLightAolElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol.js';

@Component({
  selector: 'obi-light-aol',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightAol {
  private _el: ObiLightAolElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAolElement>,
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

