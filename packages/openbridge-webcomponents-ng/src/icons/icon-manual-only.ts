import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiManualOnly as ObiManualOnlyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-manual-only.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-manual-only.js';

@Component({
  selector: 'obi-manual-only',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiManualOnly {
  private _el: ObiManualOnlyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiManualOnlyElement>,
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

