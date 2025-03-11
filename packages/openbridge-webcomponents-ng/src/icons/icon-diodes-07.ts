import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes07 as ObiDiodes07Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07.js';

@Component({
  selector: 'obi-diodes-07',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDiodes07 {
  private _el: ObiDiodes07Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes07Element>,
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

