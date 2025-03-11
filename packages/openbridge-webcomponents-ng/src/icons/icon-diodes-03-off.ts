import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes03Off as ObiDiodes03OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03-off.js';

@Component({
  selector: 'obi-diodes-03-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes03Off {
  private _el: ObiDiodes03OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes03OffElement>,
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

