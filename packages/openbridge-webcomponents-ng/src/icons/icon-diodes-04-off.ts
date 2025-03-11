import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes04Off as ObiDiodes04OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-04-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-04-off.js';

@Component({
  selector: 'obi-diodes-04-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes04Off {
  private _el: ObiDiodes04OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes04OffElement>,
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

