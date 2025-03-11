import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes07On as ObiDiodes07OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07-on.js';

@Component({
  selector: 'obi-diodes-07-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes07On {
  private _el: ObiDiodes07OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes07OnElement>,
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

