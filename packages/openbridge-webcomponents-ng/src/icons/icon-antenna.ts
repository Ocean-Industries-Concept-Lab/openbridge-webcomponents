import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntenna as ObiAntennaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna.js';

@Component({
  selector: 'obi-antenna',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAntenna {
  private _el: ObiAntennaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntennaElement>,
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

