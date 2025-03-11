import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPumpOffHorizontal as ObiPumpOffHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-off-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pump-off-horizontal.js';

@Component({
  selector: 'obi-pump-off-horizontal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPumpOffHorizontal {
  private _el: ObiPumpOffHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPumpOffHorizontalElement>,
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

