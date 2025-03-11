import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes02On as ObiDiodes02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02-on.js';

@Component({
  selector: 'obi-diodes-02-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes02On {
  private _el: ObiDiodes02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes02OnElement>,
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

