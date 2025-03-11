import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDisplayBrillianceIec as ObiDisplayBrillianceIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-iec.js';

@Component({
  selector: 'obi-display-brilliance-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDisplayBrillianceIec {
  private _el: ObiDisplayBrillianceIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDisplayBrillianceIecElement>,
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

