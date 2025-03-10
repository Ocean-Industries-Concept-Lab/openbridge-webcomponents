import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRedoIec as ObiRedoIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-redo-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-redo-iec.js';

@Component({
  selector: 'obi-redo-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRedoIec {
  private _el: ObiRedoIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRedoIecElement>,
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

