import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes05On as ObiDiodes05OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05-on.js';

@Component({
  selector: 'obi-diodes-05-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes05On {
  private _el: ObiDiodes05OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes05OnElement>,
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

