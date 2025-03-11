import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes05 as ObiDiodes05Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05.js';

@Component({
  selector: 'obi-diodes-05',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes05 {
  private _el: ObiDiodes05Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes05Element>,
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

