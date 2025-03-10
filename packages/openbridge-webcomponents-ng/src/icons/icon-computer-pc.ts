import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComputerPc as ObiComputerPcElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-computer-pc.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-computer-pc.js';

@Component({
  selector: 'obi-computer-pc',
  template: '<ng-content></ng-content>',
})
export class ObiComputerPc {
  private _el: ObiComputerPcElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComputerPcElement>,
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

