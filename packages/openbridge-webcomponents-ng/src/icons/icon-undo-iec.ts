import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUndoIec as ObiUndoIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-undo-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-undo-iec.js';

@Component({
  selector: 'obi-undo-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiUndoIec {
  private _el: ObiUndoIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUndoIecElement>,
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

