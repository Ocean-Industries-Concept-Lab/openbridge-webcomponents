import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenPad as ObiScreenPadElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-pad.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-pad.js';

@Component({
  selector: 'obi-screen-pad',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiScreenPad {
  private _el: ObiScreenPadElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenPadElement>,
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

