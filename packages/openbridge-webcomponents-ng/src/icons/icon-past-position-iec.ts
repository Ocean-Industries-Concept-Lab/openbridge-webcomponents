import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPastPositionIec as ObiPastPositionIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-past-position-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-past-position-iec.js';

@Component({
  selector: 'obi-past-position-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPastPositionIec {
  private _el: ObiPastPositionIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPastPositionIecElement>,
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

