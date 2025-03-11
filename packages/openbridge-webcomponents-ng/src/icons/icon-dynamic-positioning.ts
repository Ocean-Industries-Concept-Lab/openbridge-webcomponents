import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDynamicPositioning as ObiDynamicPositioningElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dynamic-positioning.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dynamic-positioning.js';

@Component({
  selector: 'obi-dynamic-positioning',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDynamicPositioning {
  private _el: ObiDynamicPositioningElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDynamicPositioningElement>,
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

