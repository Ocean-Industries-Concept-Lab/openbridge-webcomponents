import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUpIec as ObiUpIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-up-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-up-iec.js';

@Component({
  selector: 'obi-up-iec',
  template: '<ng-content></ng-content>',
})
export class ObiUpIec {
  private _el: ObiUpIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUpIecElement>,
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

