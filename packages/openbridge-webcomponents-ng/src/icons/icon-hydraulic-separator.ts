import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHydraulicSeparator as ObiHydraulicSeparatorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-hydraulic-separator.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-hydraulic-separator.js';

@Component({
  selector: 'obi-hydraulic-separator',
  template: '<ng-content></ng-content>',
})
export class ObiHydraulicSeparator {
  private _el: ObiHydraulicSeparatorElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHydraulicSeparatorElement>,
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

