import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWipers as ObiWipersElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wipers.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wipers.js';

@Component({
  selector: 'obi-wipers',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWipers {
  private _el: ObiWipersElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWipersElement>,
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

