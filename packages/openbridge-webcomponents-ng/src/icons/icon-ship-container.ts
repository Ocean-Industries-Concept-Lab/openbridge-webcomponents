import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipContainer as ObiShipContainerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-container.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-container.js';

@Component({
  selector: 'obi-ship-container',
  template: '<ng-content></ng-content>',
})
export class ObiShipContainer {
  private _el: ObiShipContainerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipContainerElement>,
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

