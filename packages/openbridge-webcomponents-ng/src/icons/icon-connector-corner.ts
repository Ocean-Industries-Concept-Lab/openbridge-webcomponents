import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorCorner as ObiConnectorCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-corner.js';

@Component({
  selector: 'obi-connector-corner',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnectorCorner {
  private _el: ObiConnectorCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorCornerElement>,
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

