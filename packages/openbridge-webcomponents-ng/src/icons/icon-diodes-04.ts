import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes04 as ObiDiodes04Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-04.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-04.js';

@Component({
  selector: 'obi-diodes-04',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes04 {
  private _el: ObiDiodes04Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes04Element>,
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

