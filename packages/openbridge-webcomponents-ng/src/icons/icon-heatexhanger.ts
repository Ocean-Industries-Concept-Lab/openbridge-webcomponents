import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeatexhanger as ObiHeatexhangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heatexhanger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heatexhanger.js';

@Component({
  selector: 'obi-heatexhanger',
  template: '<ng-content></ng-content>',
})
export class ObiHeatexhanger {
  private _el: ObiHeatexhangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeatexhangerElement>,
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

