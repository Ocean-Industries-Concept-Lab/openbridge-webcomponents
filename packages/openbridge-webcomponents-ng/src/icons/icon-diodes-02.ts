import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes02 as ObiDiodes02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02.js';

@Component({
  selector: 'obi-diodes-02',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes02 {
  private _el: ObiDiodes02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes02Element>,
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

