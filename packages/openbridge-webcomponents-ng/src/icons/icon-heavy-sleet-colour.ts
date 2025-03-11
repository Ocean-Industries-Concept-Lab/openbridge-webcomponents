import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleetColour as ObiHeavySleetColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-colour.js';

@Component({
  selector: 'obi-heavy-sleet-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeavySleetColour {
  private _el: ObiHeavySleetColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetColourElement>,
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

