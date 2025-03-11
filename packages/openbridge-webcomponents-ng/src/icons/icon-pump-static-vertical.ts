import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpStaticVertical as ObiPumpStaticVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-static-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-static-vertical.js';

@Component({
  selector: 'obi-pump-static-vertical',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPumpStaticVertical {
  private _el: ObiPumpStaticVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpStaticVerticalElement>,
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

