import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerOffVertical as ObiBlowerOffVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-off-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-off-vertical.js';

@Component({
  selector: 'obi-blower-off-vertical',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerOffVertical {
  private _el: ObiBlowerOffVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerOffVerticalElement>,
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

