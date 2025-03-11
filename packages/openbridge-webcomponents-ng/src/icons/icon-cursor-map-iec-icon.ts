import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorMapIecIcon as ObiCursorMapIecIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map-iec-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map-iec-icon.js';

@Component({
  selector: 'obi-cursor-map-iec-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorMapIecIcon {
  private _el: ObiCursorMapIecIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorMapIecIconElement>,
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

