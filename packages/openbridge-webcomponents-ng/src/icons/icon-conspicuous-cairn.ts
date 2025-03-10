import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConspicuousCairn as ObiConspicuousCairnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conspicuous-cairn.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conspicuous-cairn.js';

@Component({
  selector: 'obi-conspicuous-cairn',
  template: '<ng-content></ng-content>',
})
export class ObiConspicuousCairn {
  private _el: ObiConspicuousCairnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConspicuousCairnElement>,
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

