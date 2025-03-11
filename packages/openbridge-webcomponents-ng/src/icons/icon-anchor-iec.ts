import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAnchorIec as ObiAnchorIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-anchor-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-anchor-iec.js';

@Component({
  selector: 'obi-anchor-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAnchorIec {
  private _el: ObiAnchorIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAnchorIecElement>,
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

