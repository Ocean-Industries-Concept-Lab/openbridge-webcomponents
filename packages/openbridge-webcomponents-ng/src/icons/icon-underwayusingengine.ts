import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUnderwayusingengine as ObiUnderwayusingengineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-underwayusingengine.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-underwayusingengine.js';

@Component({
  selector: 'obi-underwayusingengine',
  template: '<ng-content></ng-content>',
})
export class ObiUnderwayusingengine {
  private _el: ObiUnderwayusingengineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUnderwayusingengineElement>,
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

