import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpOffVertical as ObiPumpOffVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-off-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-off-vertical.js';

@Component({
  selector: 'obi-pump-off-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiPumpOffVertical {
  private _el: ObiPumpOffVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpOffVerticalElement>,
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

