import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySnowColour as ObiHeavySnowColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-colour.js';

@Component({
  selector: 'obi-heavy-snow-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeavySnowColour {
  private _el: ObiHeavySnowColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySnowColourElement>,
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

