import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes03On as ObiDiodes03OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03-on.js';

@Component({
  selector: 'obi-diodes-03-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes03On {
  private _el: ObiDiodes03OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes03OnElement>,
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

