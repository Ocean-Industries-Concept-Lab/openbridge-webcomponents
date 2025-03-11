import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpOnVertical as ObiPumpOnVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-on-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-on-vertical.js';

@Component({
  selector: 'obi-pump-on-vertical',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPumpOnVertical {
  private _el: ObiPumpOnVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpOnVerticalElement>,
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

