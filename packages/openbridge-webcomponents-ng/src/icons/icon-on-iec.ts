import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOnIec as ObiOnIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on-iec.js';

@Component({
  selector: 'obi-on-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOnIec {
  private _el: ObiOnIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOnIecElement>,
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

