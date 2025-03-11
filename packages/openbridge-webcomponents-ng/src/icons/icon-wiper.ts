import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWiper as ObiWiperElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wiper.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wiper.js';

@Component({
  selector: 'obi-wiper',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWiper {
  private _el: ObiWiperElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWiperElement>,
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

