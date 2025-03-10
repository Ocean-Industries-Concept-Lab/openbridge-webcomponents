import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputLeft as ObiInputLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-left.js';

@Component({
  selector: 'obi-input-left',
  template: '<ng-content></ng-content>',
})
export class ObiInputLeft {
  private _el: ObiInputLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputLeftElement>,
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

