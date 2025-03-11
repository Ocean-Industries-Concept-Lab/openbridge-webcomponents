import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEpms as ObiEpmsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-epms.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-epms.js';

@Component({
  selector: 'obi-epms',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEpms {
  private _el: ObiEpmsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEpmsElement>,
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

