import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSleethColour as ObiSleethColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleeth-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleeth-colour.js';

@Component({
  selector: 'obi-sleeth-colour',
  template: '<ng-content></ng-content>',
})
export class ObiSleethColour {
  private _el: ObiSleethColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSleethColourElement>,
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

