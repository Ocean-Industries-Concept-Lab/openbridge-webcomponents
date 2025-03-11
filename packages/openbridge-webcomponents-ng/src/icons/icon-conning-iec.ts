import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConningIec as ObiConningIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conning-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conning-iec.js';

@Component({
  selector: 'obi-conning-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConningIec {
  private _el: ObiConningIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConningIecElement>,
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

